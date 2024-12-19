// src/app/api/hello/route.js
export async function GET(request) {
    return new Response('Hello, World!', { status: 200 });
  }
  