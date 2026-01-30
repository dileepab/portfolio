// Blog posts data with full content
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  coverImage: string;
  tableOfContents: { id: string; title: string; level: number }[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications: A Complete Guide",
    excerpt: "Best practices for structuring large-scale React projects with maintainable architecture, state management, and performance optimization.",
    date: "Dec 15, 2025",
    readTime: "12 min",
    category: "React",
    tags: ["React", "Architecture", "Best Practices", "TypeScript"],
    author: {
      name: "Dileepa Balasuriya",
      avatar: "DB",
      role: "Senior Software Engineer"
    },
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    tableOfContents: [
      { id: "introduction", title: "Introduction", level: 1 },
      { id: "project-structure", title: "Project Structure", level: 1 },
      { id: "component-architecture", title: "Component Architecture", level: 1 },
      { id: "state-management", title: "State Management", level: 1 },
      { id: "performance-optimization", title: "Performance Optimization", level: 1 },
      { id: "testing-strategies", title: "Testing Strategies", level: 1 },
      { id: "conclusion", title: "Conclusion", level: 1 }
    ],
    content: `
## Introduction {#introduction}

Building scalable React applications requires careful planning and adherence to best practices. In this comprehensive guide, we'll explore the key principles and patterns that will help you create maintainable, performant, and scalable React applications.

Whether you're starting a new project or refactoring an existing one, these strategies will help you build applications that can grow with your team and user base.

## Project Structure {#project-structure}

A well-organized project structure is the foundation of a scalable application. Here's a recommended structure:

\`\`\`typescript
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── Input/
│   ├── features/
│   │   ├── auth/
│   │   └── dashboard/
│   └── layouts/
├── hooks/
│   ├── useAuth.ts
│   └── useApi.ts
├── services/
│   ├── api.ts
│   └── auth.ts
├── store/
│   ├── slices/
│   └── index.ts
├── types/
│   └── index.ts
└── utils/
    └── helpers.ts
\`\`\`

### Key Principles

1. **Feature-based organization**: Group related components, hooks, and utilities by feature
2. **Separation of concerns**: Keep business logic separate from UI components
3. **Consistent naming conventions**: Use clear, descriptive names for files and folders

## Component Architecture {#component-architecture}

Creating reusable and maintainable components is crucial for scalability. Here's an example of a well-structured component:

\`\`\`tsx
import React, { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button = memo<ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  onClick,
  className
}) => {
  const handleClick = useCallback(() => {
    if (!isLoading && onClick) {
      onClick();
    }
  }, [isLoading, onClick]);

  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors',
        variants[variant],
        sizes[size],
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
});

Button.displayName = 'Button';
\`\`\`

### Component Best Practices

- Use TypeScript for type safety
- Implement proper prop validation
- Use \`memo\` for performance optimization
- Keep components focused and single-purpose

## State Management {#state-management}

Choosing the right state management solution depends on your application's complexity:

\`\`\`typescript
// Using Zustand for global state
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: async (credentials) => {
          const user = await authService.login(credentials);
          set({ user, isAuthenticated: true });
        },
        logout: () => {
          set({ user: null, isAuthenticated: false });
        },
      }),
      { name: 'user-storage' }
    )
  )
);
\`\`\`

### State Management Guidelines

| Scenario | Recommended Solution |
|----------|---------------------|
| Local UI state | useState, useReducer |
| Server state | React Query, SWR |
| Global client state | Zustand, Jotai |
| Complex forms | React Hook Form |

## Performance Optimization {#performance-optimization}

Performance is critical for user experience. Here are key optimization strategies:

\`\`\`typescript
// Lazy loading components
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));

// Optimized list rendering
const ProductList = memo(({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

// Using useMemo for expensive calculations
const filteredProducts = useMemo(() => {
  return products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );
}, [products, search]);
\`\`\`

### Performance Checklist

- Implement code splitting with lazy loading
- Use React.memo for expensive components
- Optimize re-renders with useMemo and useCallback
- Virtualize long lists with react-window
- Profile with React DevTools

## Testing Strategies {#testing-strategies}

A comprehensive testing strategy ensures code quality:

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
\`\`\`

## Conclusion {#conclusion}

Building scalable React applications requires a combination of good architecture, proper tooling, and adherence to best practices. By following the patterns outlined in this guide, you'll be well-equipped to build applications that can grow with your needs.

Remember that scalability isn't just about handling more users—it's also about maintaining code quality as your team and codebase grow. Invest in good foundations early, and your future self will thank you.

**Key Takeaways:**
- Organize code by features, not file types
- Keep components small and focused
- Choose appropriate state management solutions
- Prioritize performance from the start
- Write comprehensive tests
`
  },
  {
    id: 2,
    slug: "future-of-web-development-2026",
    title: "The Future of Web Development in 2026 and Beyond",
    excerpt: "Exploring emerging technologies and trends shaping the future of web development, from AI-powered tools to edge computing.",
    date: "Nov 28, 2025",
    readTime: "8 min",
    category: "Trends",
    tags: ["Web Development", "AI", "Future Tech", "Trends"],
    author: {
      name: "Dileepa Balasuriya",
      avatar: "DB",
      role: "Senior Software Engineer"
    },
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    tableOfContents: [
      { id: "ai-revolution", title: "The AI Revolution", level: 1 },
      { id: "edge-computing", title: "Edge Computing", level: 1 },
      { id: "webassembly", title: "WebAssembly Maturity", level: 1 },
      { id: "new-frameworks", title: "New Frameworks", level: 1 },
      { id: "predictions", title: "Predictions for 2026", level: 1 }
    ],
    content: `
## The AI Revolution {#ai-revolution}

Artificial Intelligence is transforming how we build web applications. From AI-powered code completion to automated testing, developers are leveraging AI tools to increase productivity.

\`\`\`typescript
// AI-assisted code generation example
const generateComponent = async (description: string) => {
  const response = await ai.generate({
    prompt: \`Create a React component: \${description}\`,
    model: 'gpt-4',
    temperature: 0.7
  });
  
  return response.code;
};
\`\`\`

### Key AI Trends

- **Code Assistants**: GitHub Copilot, Cursor, and similar tools
- **Automated Testing**: AI-generated test cases
- **Design to Code**: Converting designs to functional code
- **Natural Language Interfaces**: Building apps with plain English

## Edge Computing {#edge-computing}

Edge computing brings computation closer to users, reducing latency and improving performance:

\`\`\`typescript
// Edge function example (Cloudflare Workers)
export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const country = request.cf?.country || 'US';
    
    // Serve localized content based on location
    const content = await getLocalizedContent(country);
    
    return new Response(JSON.stringify(content), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
\`\`\`

## WebAssembly Maturity {#webassembly}

WebAssembly is enabling high-performance applications in the browser:

\`\`\`rust
// Rust code compiled to WebAssembly
#[wasm_bindgen]
pub fn process_image(data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(data).unwrap();
    let processed = img.blur(2.0);
    processed.to_bytes()
}
\`\`\`

## New Frameworks {#new-frameworks}

The framework landscape continues to evolve with new approaches:

- **React Server Components**: Hybrid rendering strategies
- **Astro**: Content-focused static sites
- **Solid.js**: Fine-grained reactivity
- **Qwik**: Resumability over hydration

## Predictions for 2026 {#predictions}

1. AI will write 50% of boilerplate code
2. Edge-first architectures become standard
3. WebAssembly adoption increases 300%
4. No-code/low-code tools mature significantly
5. Web3 integration becomes seamless
`
  },
  {
    id: 3,
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics: From Basics to Advanced Patterns",
    excerpt: "Deep dive into TypeScript generics and how to leverage them for type-safe, reusable code that scales.",
    date: "Nov 10, 2025",
    readTime: "15 min",
    category: "TypeScript",
    tags: ["TypeScript", "Generics", "Type Safety", "Advanced"],
    author: {
      name: "Dileepa Balasuriya",
      avatar: "DB",
      role: "Senior Software Engineer"
    },
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop",
    tableOfContents: [
      { id: "basics", title: "Generic Basics", level: 1 },
      { id: "constraints", title: "Generic Constraints", level: 1 },
      { id: "utility-types", title: "Utility Types", level: 1 },
      { id: "advanced-patterns", title: "Advanced Patterns", level: 1 },
      { id: "real-world", title: "Real-World Examples", level: 1 }
    ],
    content: `
## Generic Basics {#basics}

Generics allow you to write flexible, reusable code while maintaining type safety:

\`\`\`typescript
// Basic generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const num = identity<number>(42);      // type: number
const str = identity<string>('hello'); // type: string
const inferred = identity(true);       // type: boolean (inferred)

// Generic interface
interface Container<T> {
  value: T;
  getValue: () => T;
}

const numberContainer: Container<number> = {
  value: 42,
  getValue: () => 42
};
\`\`\`

## Generic Constraints {#constraints}

Constraints limit what types can be used with generics:

\`\`\`typescript
// Constraint with extends
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello');     // OK - string has length
logLength([1, 2, 3]);   // OK - array has length
logLength({ length: 5 }); // OK - object has length
// logLength(123);      // Error - number doesn't have length

// Multiple constraints
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}
\`\`\`

## Utility Types {#utility-types}

TypeScript provides powerful built-in utility types:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserCredentials = Pick<User, 'email' | 'password'>;

// Omit - exclude specific properties
type PublicUser = Omit<User, 'password'>;

// Required - all properties required
type RequiredUser = Required<PartialUser>;

// Record - create object type with specific keys
type UserRoles = Record<'admin' | 'user' | 'guest', User[]>;

// Custom utility type
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;
\`\`\`

## Advanced Patterns {#advanced-patterns}

Advanced generic patterns for complex scenarios:

\`\`\`typescript
// Conditional types
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>;  // true
type Test2 = IsArray<string>;    // false

// Infer keyword
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnwrapPromise<Promise<string>>; // string

// Mapped types with modifiers
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]+?: T[P];
};

// Template literal types
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<'click'>; // 'onClick'
\`\`\`

## Real-World Examples {#real-world}

Practical applications of generics:

\`\`\`typescript
// Type-safe API client
class ApiClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json() as Promise<T>;
  }

  async post<T, U>(url: string, data: U): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json() as Promise<T>;
  }
}

// Usage
interface User {
  id: number;
  name: string;
}

const api = new ApiClient();
const user = await api.get<User>('/api/users/1');
const newUser = await api.post<User, Omit<User, 'id'>>('/api/users', { name: 'John' });

// Type-safe event emitter
class TypedEventEmitter<Events extends Record<string, any>> {
  private listeners: Partial<{
    [K in keyof Events]: ((data: Events[K]) => void)[];
  }> = {};

  on<K extends keyof Events>(event: K, listener: (data: Events[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]) {
    this.listeners[event]?.forEach(listener => listener(data));
  }
}

// Usage
interface AppEvents {
  userLogin: { userId: string; timestamp: Date };
  userLogout: { userId: string };
  error: { message: string; code: number };
}

const emitter = new TypedEventEmitter<AppEvents>();

emitter.on('userLogin', (data) => {
  console.log(data.userId, data.timestamp); // Fully typed!
});

emitter.emit('userLogin', { userId: '123', timestamp: new Date() });
\`\`\`
`
  },
  {
    id: 4,
    slug: "optimizing-nodejs-performance",
    title: "Optimizing Node.js Performance: A Practical Guide",
    excerpt: "Techniques and strategies for improving the performance of Node.js applications in production environments.",
    date: "Oct 22, 2025",
    readTime: "10 min",
    category: "Backend",
    tags: ["Node.js", "Performance", "Backend", "Optimization"],
    author: {
      name: "Dileepa Balasuriya",
      avatar: "DB",
      role: "Senior Software Engineer"
    },
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    tableOfContents: [
      { id: "profiling", title: "Profiling Your Application", level: 1 },
      { id: "async-patterns", title: "Async Patterns", level: 1 },
      { id: "memory-management", title: "Memory Management", level: 1 },
      { id: "caching", title: "Caching Strategies", level: 1 },
      { id: "clustering", title: "Clustering & Scaling", level: 1 }
    ],
    content: `
## Profiling Your Application {#profiling}

Before optimizing, you need to identify bottlenecks:

\`\`\`javascript
// Using Node.js built-in profiler
// Run with: node --prof app.js
// Process with: node --prof-process isolate-*.log > processed.txt

// Using clinic.js for profiling
// npm install -g clinic
// clinic doctor -- node app.js

// Custom timing middleware
const timingMiddleware = (req, res, next) => {
  const start = process.hrtime.bigint();
  
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1e6; // Convert to ms
    console.log(\`\${req.method} \${req.url} - \${duration.toFixed(2)}ms\`);
  });
  
  next();
};
\`\`\`

## Async Patterns {#async-patterns}

Proper async handling is crucial for Node.js performance:

\`\`\`typescript
// Bad: Sequential execution
async function fetchUserDataBad(userId: string) {
  const user = await db.getUser(userId);
  const posts = await db.getPosts(userId);
  const comments = await db.getComments(userId);
  return { user, posts, comments };
}

// Good: Parallel execution
async function fetchUserDataGood(userId: string) {
  const [user, posts, comments] = await Promise.all([
    db.getUser(userId),
    db.getPosts(userId),
    db.getComments(userId)
  ]);
  return { user, posts, comments };
}

// Better: With error handling
async function fetchUserDataBetter(userId: string) {
  const results = await Promise.allSettled([
    db.getUser(userId),
    db.getPosts(userId),
    db.getComments(userId)
  ]);
  
  return {
    user: results[0].status === 'fulfilled' ? results[0].value : null,
    posts: results[1].status === 'fulfilled' ? results[1].value : [],
    comments: results[2].status === 'fulfilled' ? results[2].value : []
  };
}
\`\`\`

## Memory Management {#memory-management}

Efficient memory usage prevents leaks and improves performance:

\`\`\`typescript
// Stream large files instead of loading into memory
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';

async function compressFile(input: string, output: string) {
  await pipeline(
    createReadStream(input),
    createGzip(),
    createWriteStream(output)
  );
}

// Use WeakMap for caching with automatic cleanup
const cache = new WeakMap<object, any>();

function memoize<T extends object, R>(
  fn: (obj: T) => R
): (obj: T) => R {
  return (obj: T) => {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}
\`\`\`

## Caching Strategies {#caching}

Implement multi-layer caching for optimal performance:

\`\`\`typescript
import Redis from 'ioredis';

class CacheService {
  private redis: Redis;
  private memoryCache: Map<string, { value: any; expiry: number }>;

  constructor() {
    this.redis = new Redis();
    this.memoryCache = new Map();
  }

  async get<T>(key: string): Promise<T | null> {
    // L1: Memory cache
    const memCached = this.memoryCache.get(key);
    if (memCached && memCached.expiry > Date.now()) {
      return memCached.value;
    }

    // L2: Redis cache
    const redisCached = await this.redis.get(key);
    if (redisCached) {
      const value = JSON.parse(redisCached);
      this.memoryCache.set(key, { value, expiry: Date.now() + 60000 });
      return value;
    }

    return null;
  }

  async set(key: string, value: any, ttlSeconds: number = 3600) {
    // Set in both caches
    this.memoryCache.set(key, { 
      value, 
      expiry: Date.now() + Math.min(ttlSeconds * 1000, 60000) 
    });
    await this.redis.setex(key, ttlSeconds, JSON.stringify(value));
  }
}
\`\`\`

## Clustering & Scaling {#clustering}

Utilize all CPU cores with clustering:

\`\`\`typescript
import cluster from 'cluster';
import { cpus } from 'os';
import express from 'express';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running\`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Replace dead worker
  });
} else {
  const app = express();
  
  app.get('/', (req, res) => {
    res.send(\`Hello from worker \${process.pid}\`);
  });

  app.listen(3000, () => {
    console.log(\`Worker \${process.pid} started\`);
  });
}
\`\`\`
`
  },
  {
    id: 5,
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques Every Developer Should Know",
    excerpt: "Explore powerful CSS features like Container Queries, CSS Grid, and the new color functions that are changing how we style the web.",
    date: "Oct 5, 2025",
    readTime: "9 min",
    category: "CSS",
    tags: ["CSS", "Frontend", "Design", "Web Development"],
    author: {
      name: "Dileepa Balasuriya",
      avatar: "DB",
      role: "Senior Software Engineer"
    },
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=600&fit=crop",
    tableOfContents: [
      { id: "container-queries", title: "Container Queries", level: 1 },
      { id: "css-grid", title: "Advanced CSS Grid", level: 1 },
      { id: "color-functions", title: "Modern Color Functions", level: 1 },
      { id: "animations", title: "Scroll-Driven Animations", level: 1 }
    ],
    content: `
## Container Queries {#container-queries}

Container queries allow components to adapt based on their container size:

\`\`\`css
/* Define a container */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Style based on container width */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
  }
}

@container card (min-width: 600px) {
  .card {
    grid-template-columns: 300px 1fr;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
}
\`\`\`

## Advanced CSS Grid {#css-grid}

Modern grid techniques for complex layouts:

\`\`\`css
/* Responsive grid without media queries */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
}

/* Subgrid for aligned nested content */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}

/* Named grid areas */
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
\`\`\`

## Modern Color Functions {#color-functions}

New color functions provide powerful color manipulation:

\`\`\`css
:root {
  /* oklch for perceptually uniform colors */
  --primary: oklch(65% 0.25 250);
  --primary-light: oklch(from var(--primary) calc(l + 20%) c h);
  --primary-dark: oklch(from var(--primary) calc(l - 20%) c h);
  
  /* color-mix for blending */
  --overlay: color-mix(in oklch, var(--primary) 30%, transparent);
  
  /* Relative color syntax */
  --muted: oklch(from var(--primary) l c calc(h + 180));
}

/* Dynamic theming */
.theme-generator {
  --hue: 250;
  --primary: oklch(65% 0.25 var(--hue));
  --secondary: oklch(65% 0.25 calc(var(--hue) + 60));
  --accent: oklch(65% 0.25 calc(var(--hue) + 180));
}
\`\`\`

## Scroll-Driven Animations {#animations}

Create animations that respond to scroll position:

\`\`\`css
/* Scroll progress indicator */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--primary);
  transform-origin: left;
  animation: grow-progress linear;
  animation-timeline: scroll();
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Reveal on scroll */
.reveal-on-scroll {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
\`\`\`
`
  },
  {
    id: 6,
    slug: "api-design-best-practices",
    title: "REST API Design Best Practices for Modern Applications",
    excerpt: "Learn how to design clean, intuitive, and scalable REST APIs that developers will love to use.",
    date: "Sep 18, 2025",
    readTime: "11 min",
    category: "Backend",
    tags: ["API", "REST", "Backend", "Architecture"],
    author: {
      name: "Dileepa Balasuriya",
      avatar: "DB",
      role: "Senior Software Engineer"
    },
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop",
    tableOfContents: [
      { id: "naming", title: "Resource Naming", level: 1 },
      { id: "http-methods", title: "HTTP Methods", level: 1 },
      { id: "error-handling", title: "Error Handling", level: 1 },
      { id: "pagination", title: "Pagination & Filtering", level: 1 },
      { id: "versioning", title: "API Versioning", level: 1 }
    ],
    content: `
## Resource Naming {#naming}

Use clear, consistent naming conventions:

\`\`\`
# Good: Plural nouns, hierarchical structure
GET    /api/users
GET    /api/users/123
GET    /api/users/123/posts
POST   /api/users/123/posts

# Bad: Verbs, inconsistent naming
GET    /api/getUser/123
POST   /api/createPost
GET    /api/user_posts/123
\`\`\`

## HTTP Methods {#http-methods}

Use HTTP methods correctly:

\`\`\`typescript
// Express.js example
const router = express.Router();

// GET - Retrieve resources
router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json({ data: users });
});

// POST - Create new resource
router.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user });
});

// PUT - Replace entire resource
router.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.update(req.body);
  res.json({ data: user });
});

// PATCH - Partial update
router.patch('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.update(req.body, { fields: Object.keys(req.body) });
  res.json({ data: user });
});

// DELETE - Remove resource
router.delete('/users/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});
\`\`\`

## Error Handling {#error-handling}

Provide consistent, informative error responses:

\`\`\`typescript
interface ApiError {
  status: number;
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// Error response examples
{
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "details": {
    "email": ["Invalid email format"],
    "password": ["Must be at least 8 characters"]
  }
}

{
  "status": 404,
  "code": "NOT_FOUND",
  "message": "User not found"
}

{
  "status": 429,
  "code": "RATE_LIMITED",
  "message": "Too many requests",
  "retryAfter": 60
}
\`\`\`

## Pagination & Filtering {#pagination}

Implement flexible pagination and filtering:

\`\`\`typescript
// Request
GET /api/posts?page=2&limit=20&sort=-createdAt&status=published

// Response
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 156,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": true
  },
  "links": {
    "self": "/api/posts?page=2&limit=20",
    "first": "/api/posts?page=1&limit=20",
    "prev": "/api/posts?page=1&limit=20",
    "next": "/api/posts?page=3&limit=20",
    "last": "/api/posts?page=8&limit=20"
  }
}
\`\`\`

## API Versioning {#versioning}

Choose a versioning strategy:

\`\`\`typescript
// URL versioning (recommended)
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// Header versioning
app.use('/api', (req, res, next) => {
  const version = req.headers['api-version'] || 'v1';
  req.apiVersion = version;
  next();
});
\`\`\`
`
  }
];

export const categories = ['All', 'React', 'TypeScript', 'Backend', 'Trends', 'CSS'];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post =>
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
};
