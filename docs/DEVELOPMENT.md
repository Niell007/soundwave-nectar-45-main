# Development Guidelines

## Code Style

### TypeScript

1. **Type Safety**
```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Bad
type User = any;
```

2. **Null Checks**
```typescript
// ✅ Good
function getUserName(user: User | null): string {
  return user?.name ?? 'Guest';
}

// ❌ Bad
function getUserName(user: User): string {
  return user.name;
}
```

3. **Async/Await**
```typescript
// ✅ Good
async function fetchUser() {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// ❌ Bad
function fetchUser() {
  return api.get('/user')
    .then(response => response.data)
    .catch(error => console.error(error));
}
```

### React Components

1. **Functional Components**
```typescript
// ✅ Good
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return <div>{user.name}</div>;
};

// ❌ Bad
class UserProfile extends React.Component<UserProfileProps> {
  render() {
    return <div>{this.props.user.name}</div>;
  }
}
```

2. **Hooks**
```typescript
// ✅ Good
const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  return user;
};

// ❌ Bad
function getUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }); // Missing dependency array
}
```

3. **Props**
```typescript
// ✅ Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

// ❌ Bad
interface ButtonProps {
  onClick: any;
  children: any;
  variant: string;
}
```

## Project Structure

### Component Organization

```
components/
├── feature/              # Feature-specific components
│   ├── ComponentName.tsx
│   ├── ComponentName.test.tsx
│   └── index.ts
├── shared/              # Shared components
│   ├── Button/
│   ├── Input/
│   └── Card/
└── layout/              # Layout components
    ├── Header/
    └── Footer/
```

### State Management

1. **Local State**
```typescript
// Use useState for component-level state
const [isOpen, setIsOpen] = useState(false);
```

2. **Context**
```typescript
// Use context for shared state
const ThemeContext = createContext<Theme>('light');
```

3. **Query Management**
```typescript
// Use TanStack Query for server state
const { data, isLoading } = useQuery(['user', id], fetchUser);
```

## Testing

### Unit Tests

```typescript
describe('Button', () => {
  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Integration Tests

```typescript
describe('UserProfile', () => {
  it('loads and displays user data', async () => {
    render(<UserProfile userId="123" />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });
});
```

## Performance

### Optimization Techniques

1. **Memoization**
```typescript
const MemoizedComponent = React.memo(Component);
```

2. **Code Splitting**
```typescript
const LazyComponent = React.lazy(() => import('./Component'));
```

3. **Virtual Lists**
```typescript
import { VirtualizedList } from 'react-virtualized';

<VirtualizedList
  width={800}
  height={600}
  rowCount={items.length}
  rowHeight={50}
  rowRenderer={rowRenderer}
/>
```

## Error Handling

### Error Boundaries

```typescript
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### API Error Handling

```typescript
async function fetchData() {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new NotFoundError();
    }
    throw error;
  }
}
```

## Documentation

### Component Documentation

```typescript
/**
 * Button Component
 * 
 * @component
 * @example
 * ```tsx
 * <Button
 *   onClick={() => console.log('clicked')}
 *   variant="primary"
 * >
 *   Click me
 * </Button>
 * ```
 */
```

### Type Documentation

```typescript
/**
 * User type
 * @property {string} id - Unique identifier
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 */
interface User {
  id: string;
  name: string;
  email: string;
}
```

## Git Workflow

### Commit Messages

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

### Branch Naming

```
feature/feature-name
bugfix/bug-description
hotfix/issue-description
release/version-number
```

## Deployment

### Build Process

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Environment Variables

```env
# Development
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true

# Production
VITE_API_URL=https://api.production.com
VITE_DEBUG=false
```

## Security

### Best Practices

1. Input Validation
2. XSS Prevention
3. CSRF Protection
4. Secure Authentication
5. API Security
6. Environment Variables
7. Dependency Scanning

## Accessibility

### Guidelines

1. Proper HTML Semantics
2. ARIA Labels
3. Keyboard Navigation
4. Color Contrast
5. Screen Reader Support
6. Focus Management
7. Error Announcements
