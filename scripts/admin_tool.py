import requests
import json
import os
import sys
from typing import Dict

# ── Configuration ────────────────────────────────────────────────────────────

API_URL = "http://localhost:8000/api/v1/admin/settings"
def load_token_from_env_file():
    """Tries to find ADMIN_TOKEN in ../apps/api/.env if not in environment."""
    # 1. Check environment
    token = os.environ.get("ADMIN_TOKEN")
    if token:
        return token
    
    # 2. Try to read from ../apps/api/.env
    env_path = os.path.join(os.path.dirname(__file__), "..", "apps", "api", ".env")
    if os.path.exists(env_path):
        with open(env_path, "r") as f:
            for line in f:
                if line.startswith("ADMIN_TOKEN="):
                    return line.split("=")[1].strip()
    return None

def get_headers():
    token = load_token_from_env_file()
    if not token:
        print("Error: ADMIN_TOKEN not found in environment or apps/api/.env file.")
        print("Please set ADMIN_TOKEN in your .env or run: export ADMIN_TOKEN=your_token")
        sys.exit(1)
    return {"X-Admin-Token": token, "Content-Type": "application/json"}

# ── Actions ──────────────────────────────────────────────────────────────────

def show_settings():
    """Fetches and displays current portfolio settings."""
    try:
        response = requests.get(API_URL, headers=get_headers())
        response.raise_for_status()
        settings = response.json()
        
        print("\n=== Current Portfolio Settings ===")
        print(json.dumps(settings, indent=2, ensure_ascii=False))
        print("==================================\n")
    except Exception as e:
        print(f"Error fetching settings: {e}")

def update_bio(new_bio: str):
    """Updates the owner biography."""
    try:
        payload = {"owner_bio": new_bio}
        response = requests.patch(API_URL, headers=get_headers(), json=payload)
        response.raise_for_status()
        print("Successfully updated owner biography. ✨")
    except Exception as e:
        print(f"Error updating bio: {e}")

# ── CLI Interface ────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python admin_tool.py show          # View current settings")
        print("  python admin_tool.py set-bio       # Update bio (reads from input)")
        return

    cmd = sys.argv[1]
    if cmd == "show":
        show_settings()
    elif cmd == "set-bio":
        print("Enter/Paste your new biography (Ctrl+D / Cmd+D to save):")
        new_bio = sys.stdin.read().strip()
        if new_bio:
            update_bio(new_bio)
        else:
            print("Operation cancelled: Empty bio.")
    else:
        print(f"Unknown command: {cmd}")

if __name__ == "__main__":
    main()
