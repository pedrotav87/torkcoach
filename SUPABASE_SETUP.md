# Tork Coach - Authentication

## Authentication Provider

This application uses **Firebase Authentication** for user management and authentication.

Supabase has been removed from this project.

For Firebase setup instructions, please see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
   ```

### 4. Set Up Authentication in Supabase

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (should be enabled by default)
3. Optional: Configure email templates under **Authentication** → **Email Templates**

### 5. Set Up Row Level Security (RLS)

Run the following SQL in your Supabase SQL Editor (**SQL Editor** in sidebar):

```sql
-- Enable Row Level Security on auth.users (already enabled by default)

-- Create a profiles table for extended user data
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'coach',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'coach')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 6. Create Your First Coach Account

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser
3. Click "Sign Up" on the login page
4. Enter your details:
   - **Full Name**: Your name
   - **Email**: Your email address
   - **Password**: At least 6 characters
5. Check your email for the verification link (check spam folder if needed)
6. Click the verification link
7. Return to the app and sign in

## Security Notes

- ✅ **Authentication is required** - All routes are protected and require login
- ✅ **Role-based access** - Only users with `role: 'coach'` can access the platform
- ✅ **Row-level security** - Supabase RLS ensures data isolation
- ✅ **Secure sessions** - Sessions automatically refresh and expire appropriately
- ✅ **Environment variables** - Credentials never exposed in client code

## Public URL / Demo Access

To create a public demo URL that bypasses authentication:

1. Create a separate demo page component
2. Set up a special public route (e.g., `/demo` or `/public`)
3. Use conditional rendering to show public content without auth

**Current setup**: All routes require authentication by default for security.

## Troubleshooting

### "Invalid credentials" error
- Double-check your `.env` file values
- Make sure the Supabase URL doesn't have a trailing slash
- Restart the dev server after changing `.env`

### Email verification not received
- Check spam/junk folder
- In Supabase dashboard, go to **Authentication** → **Settings** and disable email confirmation for development:
  - Set "Enable email confirmations" to OFF (development only)

### "Access Denied" after login
- Make sure your user has `role: 'coach'` in their metadata
- Update the user in Supabase dashboard under **Authentication** → **Users**
- Click on the user and edit their metadata to include `"role": "coach"`

## Next Steps

- Set up database tables for clients, programs, check-ins, etc.
- Configure storage buckets for progress photos
- Set up real-time subscriptions for live updates
- Add social auth providers (Google, GitHub, etc.)
