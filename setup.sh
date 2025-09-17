#!/bin/bash
echo "🚀 Setting up TechLap Frontend..."

# Tạo .env từ template
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file"
    echo "📝 Please edit .env with your backend uploads path"
else
    echo "✅ .env file already exists"
fi

# Tạo symlink đến backend uploads
BACKEND_PATH=$(grep REACT_APP_BACKEND_UPLOADS_PATH .env | cut -d '=' -f2)
if [ -d "$BACKEND_PATH" ]; then
    rm -rf storage
    ln -s "$BACKEND_PATH" storage
    echo "✅ Created symlink to backend uploads: $BACKEND_PATH"
else
    mkdir -p storage
    echo "⚠️  Backend path not found: $BACKEND_PATH"
    echo "   Please check your .env file"
fi

echo "🎉 Setup complete! Run 'npm start' to begin."
