import React from 'react';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '../components/Form';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import { schema as eligibilitySchema, type InputType as EligibilitySubmissionData } from '../endpoints/eligibility_POST.schema';
import { useCheckEligibility } from '../helpers/useCheckEligibility';
import { CheckCircle, Loader2 } from 'lucide-react';
import { StrongCTA } from '../components/StrongCTA';
import styles from './check-eligibility.module.css';

// Form state type with string inputs (HTML inputs always return strings)
type EligibilityFormValues = {
  name: string;
  phoneNumber: string;
  email: string;
  course: string;
  branch: string;
  previousUniversity: string;
  papersPassed: string;
  comments?: string;
};

const CheckEligibilityPage: React.FC = () => {
  const eligibilityMutation = useCheckEligibility();

  const form = useForm({
    schema: z.object({
      name: z.string().min(2, "Name must be at least 2 characters."),
      phoneNumber: z.string().min(10, "Please enter a valid phone number."),
      email: z.string().email("Please enter a valid email address."),
      course: z.string().min(1, "Course is required."),
      branch: z.string().min(1, "Branch is required."),
      previousUniversity: z.string().min(2, "Previous university is required."),
      papersPassed: z.string().min(1, "Number of papers passed is required.").refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0 && Number.isInteger(Number(val)),
        "Please enter a valid positive integer."
      ),
      comments: z.string().optional(),
    }),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      course: '',
      branch: '',
      previousUniversity: '',
      papersPassed: '',
      comments: '',
    },
  });

  const { setValues, values } = form;

  const onSubmit = (data: EligibilityFormValues) => {
    // Convert to the format expected by the API
    const submissionData: EligibilitySubmissionData = {
      ...data,
      papersPassed: Number(data.papersPassed), // Convert string to number
      comments: data.comments && data.comments.trim() === "" ? undefined : data.comments,
    };
    
    eligibilityMutation.mutate(submissionData, {
      onSuccess: () => {
        toast.success('Submission Successful!', {
          description: 'Our team will review your eligibility and get back to you shortly.',
        });
        form.setValues({
          name: '',
          phoneNumber: '',
          email: '',
          course: '',
          branch: '',
          previousUniversity: '',
          papersPassed: '',
          comments: '',
        });
      },
      onError: (error) => {
        toast.error('Submission Failed', {
          description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        });
      },
    });
  };

  if (eligibilityMutation.isSuccess) {
    return (
      <div className={`${styles.container} ${styles.successContainer}`}>
        <CheckCircle className={styles.successIcon} size={64} />
        <h1 className={styles.successTitle}>Thank You!</h1>
        <p className={styles.successMessage}>
          Your eligibility information has been submitted successfully. Our admissions team will review it and contact you within 2-3 business days.
        </p>
        <StrongCTA actions={['apply']} className={styles.successCta} />
        <Button onClick={() => eligibilityMutation.reset()}>
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Check Eligibility | Edufast</title>
        <meta
          name="description"
          content="Check your eligibility for Edufast's fast-track degree programs. Fill out our quick form to see if you qualify to get your degree in just 6 months."
        />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>
            Check <span className={styles.highlight}>Eligibility</span>
          </h1>
          <p>
            Fill out the form below to see if you qualify for our accelerated degree programs.
          </p>
        </div>

        <StrongCTA actions={['counseling', 'brochure']} className={styles.headerCta} />

        <div className={styles.formWrapper}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formGrid}>
              <FormItem name="name" className={styles.gridSpan2}>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    value={values.name}
                    onChange={(e) => setValues((p) => ({ ...p, name: e.target.value }))}
                    disabled={eligibilityMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="phoneNumber">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    value={values.phoneNumber}
                    onChange={(e) => setValues((p) => ({ ...p, phoneNumber: e.target.value }))}
                    disabled={eligibilityMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="email">
                <FormLabel>Email ID</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={values.email}
                    onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))}
                    disabled={eligibilityMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="course">
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., B.Tech, BBA"
                    value={values.course}
                    onChange={(e) => setValues((p) => ({ ...p, course: e.target.value }))}
                    disabled={eligibilityMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="branch">
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Computer Science"
                    value={values.branch}
                    onChange={(e) => setValues((p) => ({ ...p, branch: e.target.value }))}
                    disabled={eligibilityMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="previousUniversity" className={styles.gridSpan2}>
                <FormLabel>Previous University</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name of your last university"
                    value={values.previousUniversity}
                    onChange={(e) => setValues((p) => ({ ...p, previousUniversity: e.target.value }))}
                    disabled={eligibilityMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="papersPassed" className={styles.gridSpan2}>
                <FormLabel>Number of Papers Passed</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter total number of papers passed"
                    value={values.papersPassed}
                    onChange={(e) => setValues((p) => ({ ...p, papersPassed: e.target.value }))}
                    disabled={eligibilityMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="comments" className={styles.gridSpan2}>
                <FormLabel>Comments (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional information or questions?"
                    value={values.comments || ''}
                    onChange={(e) => setValues((p) => ({ ...p, comments: e.target.value }))}
                    rows={4}
                    disabled={eligibilityMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <div className={styles.submitContainer}>
                <Button type="submit" size="lg" disabled={eligibilityMutation.isPending}>
                  {eligibilityMutation.isPending && (
                    <Loader2 size={18} className={styles.spinner} />
                  )}
                  SUBMIT
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CheckEligibilityPage;