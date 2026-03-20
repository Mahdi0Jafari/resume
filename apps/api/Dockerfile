# ۱. انتخاب پایه ثابت (Pinned with digest for instant builds in Iran)
FROM python:3.12-slim@sha256:ccc7089399c8bb65dd1fb3ed6d55efa538a3f5e7fca3f5988ac3b5b87e593bf0

WORKDIR /app

# ۲. نصب ابزارهای سیستم‌عاملی با «صندوقچه ذخیره»
# این خط باعث می‌شود حتی اگر لایه عوض شد، فایل‌های دانلود شده در سیستم تو بمانند
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ۳. کپی کردن فقط فایل نیازمندی‌ها (جدا از کد اصلی)
# این حرکت هوشمندانه است؛ چونrequirements.txt دیر به دیر عوض می‌شود
COPY requirements.txt .

# ۴. نصب پکیج‌های پایتون با «صندوقچه ذخیره اختصاصی»
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ۵. کپی کردن کد پروژه (این بخش مدام عوض می‌شود و باید لایه آخر باشد)
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]