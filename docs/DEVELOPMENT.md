# Development Guide

## Common Workflows

### 1. Adding New Features

```typescript
// 1. Create a new component
// src/components/feature/NewFeature.tsx
export const NewFeature = () => {
  const { data, error } = useQuery({
    queryKey: ['feature-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('your_table')
        .select('*');
      if (error) throw error;
      return data;
    }
  });
};

// 2. Add to routes
// src/components/routing/AppRoutes.tsx
{
  path: '/new-feature',
  element: (
    <ProtectedRoute>
      <NewFeature />
    </ProtectedRoute>
  )
}
```

### 2. Database Operations

```typescript
// Insert with type safety
const { data, error } = await supabase
  .from('table_name')
  .insert({
    field: value
  })
  .select()
  .single();

// Update with optimistic updates
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: async (newData) => {
    const { error } = await supabase
      .from('table_name')
      .update(newData)
      .eq('id', id);
    if (error) throw error;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['query-key']);
  }
});
```

### 3. File Uploads

```typescript
const uploadFile = async (file: File) => {
  const fileName = `${Math.random()}-${file.name}`;
  const { error } = await supabase.storage
    .from('bucket-name')
    .upload(fileName, file);
  
  if (error) throw error;
  return fileName;
};
```

## Troubleshooting Guide

### 1. Type Errors
```bash
# Regenerate types if database schema changes
supabase gen types typescript --project-id onijobnfjuuoafcygtjb > src/integrations/supabase/types.ts
```

### 2. Authentication Issues
- Check user session:
```typescript
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  // Handle not authenticated
}
```

### 3. Real-time Subscription Issues
```typescript
// Debug subscriptions
const channel = supabase
  .channel('debug-channel')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public' 
  }, (payload) => {
    console.log('Change received!', payload);
  })
  .subscribe((status) => {
    console.log('Subscription status:', status);
  });
```

### 4. Edge Function Debugging
```typescript
// Test edge function locally
supabase functions serve send-notification --no-verify-jwt

// Check logs in production
supabase functions logs send-notification
```

## Performance Optimization

### 1. Query Optimization
```typescript
// Use select to get only needed fields
const { data } = await supabase
  .from('large_table')
  .select('id, name, specific_field')
  .eq('condition', value);

// Implement pagination
const { data } = await supabase
  .from('table')
  .select('*')
  .range(0, 9);
```

### 2. Caching Strategy
```typescript
// Optimize React Query caching
const { data } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 30 * 60 * 1000 // 30 minutes
});
```

### 3. Code Splitting
```typescript
// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Use in routes
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## Best Practices

1. **Error Handling**
```typescript
try {
  const { data, error } = await supabase.from('table').select('*');
  if (error) throw error;
  // Handle data
} catch (error) {
  toast({
    title: "Error",
    description: error.message,
    variant: "destructive"
  });
}
```

2. **Form Handling**
```typescript
const form = useForm({
  defaultValues: {
    title: '',
    content: ''
  },
  resolver: zodResolver(schema)
});
```

3. **State Management**
```typescript
// Use React Query for server state
const { data } = useQuery({
  queryKey: ['key'],
  queryFn: fetchData
});

// Use local state for UI
const [isOpen, setIsOpen] = useState(false);

// Use context for global state
const { user } = useAuth();
```
