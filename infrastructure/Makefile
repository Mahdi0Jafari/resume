# 🚀 Mahdi Jafari Portfolio - Infrastructure Management

# Colors for pretty printing
BLUE := \033[36m
RESET := \033[0m

.PHONY: dev build down logs clean

# Default: Start everything in dev mode (Fast)
dev:
	@echo "$(BLUE)Starting Portfolio in FAST dev mode...$(RESET)"
	docker compose up --build --pull=never

# Full Build: Useful if you think a layer needs refresh
build:
	@echo "$(BLUE)Performing a fresh build...$(RESET)"
	docker compose build --no-cache

# Stop and remove containers
down:
	@echo "$(BLUE)Shutting down...$(RESET)"
	docker compose down

# Follow logs from all services
logs:
	docker compose logs -f

# Clean up docker system (free up space)
clean:
	docker system prune -f
	docker volume prune -f
