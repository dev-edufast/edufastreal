import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth, AUTH_QUERY_KEY } from '../helpers/useAuth';
import { useForm } from '../components/Form';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { schema as profileSchema, postUserProfile } from '../endpoints/user/profile_POST.schema';
import { schema as passwordSchema, postUserPassword } from '../endpoints/user/password_POST.schema';
import { getUserPreferences, UserPreferences } from '../endpoints/user/preferences_GET.schema';
import { postUserPreferences } from '../endpoints/user/preferences_POST.schema';
import { postExportData } from '../endpoints/user/export-data_POST.schema';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Switch } from '../components/Switch';
import { Skeleton } from '../components/Skeleton';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../components/Form';
import { User, Lock, Bell, Shield, FileDown, AlertCircle } from 'lucide-react';
import styles from './student-dashboard.settings.module.css';

const ProfileSettings: React.FC = () => {
  const { authState } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm({
    schema: profileSchema,
    defaultValues: {
      displayName: authState.type === 'authenticated' ? authState.user.displayName : '',
      email: authState.type === 'authenticated' ? authState.user.email : '',
    },
  });

  React.useEffect(() => {
    if (authState.type === 'authenticated') {
      form.setValues({
        displayName: authState.user.displayName,
        email: authState.user.email,
      });
    }
  }, [authState, form.setValues]);

  const mutation = useMutation({
    mutationFn: postUserProfile,
    onSuccess: (data) => {
      if ('user' in data) {
        toast.success('Profile updated successfully!');
        queryClient.setQueryData(AUTH_QUERY_KEY, data.user);
      } else {
        toast.error(data.error || 'Failed to update profile.');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.');
    },
  });

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    mutation.mutate(values);
  };

  if (authState.type !== 'authenticated') {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <User size={20} />
          <h2 className={styles.cardTitle}>Profile Settings</h2>
        </div>
        <div className={styles.cardContent}>
          <Skeleton style={{ height: '2.5rem', marginBottom: 'var(--spacing-4)' }} />
          <Skeleton style={{ height: '2.5rem' }} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <User size={20} />
        <h2 className={styles.cardTitle}>Profile Settings</h2>
      </div>
      <div className={styles.cardContent}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <FormItem name="displayName">
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input
                  value={form.values.displayName}
                  onChange={(e) => form.setValues((prev) => ({ ...prev, displayName: e.target.value }))}
                  placeholder="Your full name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem name="email">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  value={form.values.email}
                  onChange={(e) => form.setValues((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className={styles.cardFooter}>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const PasswordSettings: React.FC = () => {
  const form = useForm({
    schema: passwordSchema,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: postUserPassword,
    onSuccess: (data) => {
      if ('success' in data && data.success) {
        toast.success(data.message);
        form.setValues({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else if ('error' in data) {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.');
    },
  });

  const onSubmit = (values: z.infer<typeof passwordSchema>) => {
    mutation.mutate(values);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Lock size={20} />
        <h2 className={styles.cardTitle}>Change Password</h2>
      </div>
      <div className={styles.cardContent}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <FormItem name="currentPassword">
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  value={form.values.currentPassword}
                  onChange={(e) => form.setValues((prev) => ({ ...prev, currentPassword: e.target.value }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem name="newPassword">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  value={form.values.newPassword}
                  onChange={(e) => form.setValues((prev) => ({ ...prev, newPassword: e.target.value }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem name="confirmPassword">
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  value={form.values.confirmPassword}
                  onChange={(e) => form.setValues((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className={styles.cardFooter}>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const PreferencesSettings: React.FC = () => {
  const queryClient = useQueryClient();
  const preferencesQueryKey = ['userPreferences'];

  const { data, isFetching, error } = useQuery({
    queryKey: preferencesQueryKey,
    queryFn: getUserPreferences,
  });

  const mutation = useMutation({
    mutationFn: postUserPreferences,
    onSuccess: (data) => {
      if ('success' in data && data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: preferencesQueryKey });
      } else if ('error' in data) {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update preferences.');
    },
  });

  const handlePreferenceChange = (newPreferences: UserPreferences) => {
    mutation.mutate(newPreferences);
  };

  if (isFetching) {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Bell size={20} />
          <h2 className={styles.cardTitle}>Notifications & Privacy</h2>
        </div>
        <div className={styles.cardContent}>
          <Skeleton style={{ height: '2rem', width: '80%', marginBottom: 'var(--spacing-4)' }} />
          <Skeleton style={{ height: '2rem', width: '70%', marginBottom: 'var(--spacing-6)' }} />
          <Skeleton style={{ height: '2rem', width: '80%' }} />
        </div>
      </div>
    );
  }

  if (error || !data || 'error' in data) {
    return (
      <div className={`${styles.card} ${styles.errorCard}`}>
        <AlertCircle size={24} />
        <p>Could not load your preferences.</p>
      </div>
    );
  }

  const { preferences } = data;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Bell size={20} />
        <h2 className={styles.cardTitle}>Notifications</h2>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.switchItem}>
          <div className={styles.switchLabel}>
            <label htmlFor="announcements">Announcements</label>
            <p>Receive email notifications about university-wide announcements.</p>
          </div>
          <Switch
            id="announcements"
            checked={preferences.emailNotifications.announcements}
            onCheckedChange={(checked) =>
              handlePreferenceChange({
                ...preferences,
                emailNotifications: { ...preferences.emailNotifications, announcements: checked },
              })
            }
            disabled={mutation.isPending}
          />
        </div>
        <div className={styles.switchItem}>
          <div className={styles.switchLabel}>
            <label htmlFor="deadlines">Deadline Reminders</label>
            <p>Get reminders for upcoming assignment and project deadlines.</p>
          </div>
          <Switch
            id="deadlines"
            checked={preferences.emailNotifications.deadlines}
            onCheckedChange={(checked) =>
              handlePreferenceChange({
                ...preferences,
                emailNotifications: { ...preferences.emailNotifications, deadlines: checked },
              })
            }
            disabled={mutation.isPending}
          />
        </div>
      </div>
      <div className={styles.cardHeader}>
        <Shield size={20} />
        <h2 className={styles.cardTitle}>Privacy</h2>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.switchItem}>
          <div className={styles.switchLabel}>
            <label htmlFor="publicProfile">Public Profile</label>
            <p>Allow other students to see your profile.</p>
          </div>
          <Switch
            id="publicProfile"
            checked={preferences.privacy.showProfilePublicly}
            onCheckedChange={(checked) =>
              handlePreferenceChange({
                ...preferences,
                privacy: { ...preferences.privacy, showProfilePublicly: checked },
              })
            }
            disabled={mutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};

const AccountManagement: React.FC = () => {
  const mutation = useMutation({
    mutationFn: postExportData,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edufast_user_data.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Your data has been exported.');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to export data.');
    },
  });

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <FileDown size={20} />
        <h2 className={styles.cardTitle}>Account Management</h2>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.description}>
          You can request an export of all your personal data stored on Edufast.
        </p>
      </div>
      <div className={styles.cardFooter}>
        <Button variant="outline" onClick={() => mutation.mutate({})} disabled={mutation.isPending}>
          {mutation.isPending ? 'Exporting...' : 'Export My Data'}
        </Button>
      </div>
    </div>
  );
};

const StudentDashboardSettingsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Account Settings - Edufast</title>
        <meta name="description" content="Manage your account settings, password, and preferences on Edufast." />
      </Helmet>
      <div className={styles.settingsContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>Manage your profile, password, and notification preferences.</p>
        </div>
        <div className={styles.settingsGrid}>
          <div className={styles.mainColumn}>
            <ProfileSettings />
            <PasswordSettings />
          </div>
          <div className={styles.sideColumn}>
            <PreferencesSettings />
            <AccountManagement />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboardSettingsPage;