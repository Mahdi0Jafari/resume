import requests
import json
import os
import sys
from typing import Dict

# ── Configuration ────────────────────────────────────────────────────────────

API_URL = "http://localhost:8000/api/v1/admin/settings"
# Try to load token from environment or ask user
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN")

def get_headers():
    if not ADMIN_TOKEN:
        print("Error: ADMIN_TOKEN not found in environment.")
        print("Please run: export ADMIN_TOKEN=your_token")
        sys.exit(1)
    return {"X-Admin-Token": ADMIN_TOKEN, "Content-Type": "application/json"}

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
