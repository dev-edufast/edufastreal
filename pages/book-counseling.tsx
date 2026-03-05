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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/Select';
import { useBookCounseling } from '../helpers/useBookCounseling';
import { usePrograms } from '../helpers/usePrograms';
import { Skeleton } from '../components/Skeleton';
import { Checkbox } from '../components/Checkbox';
import {
  Calendar,
  Clock,
  MessageSquare,
  UserCheck,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { StrongCTA } from '../components/StrongCTA';
import styles from './book-counseling.module.css';

const counselingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  email: z.string().email('A valid email is required.'),
  phone: z.string().min(10, 'A valid phone number is required.'),
  interestedProgram: z.string().optional(),
  preferredDate: z.string().min(1, 'Please suggest a date.'),
  preferredTime: z.string().min(1, 'Please suggest a time.'),
  topics: z.array(z.string()).min(1, 'Please select at least one topic.'),
  additionalInfo: z.string().optional(),
});

type CounselingFormValues = z.infer<typeof counselingSchema>;

const TOPICS = [
  'Program Details & Curriculum',
  'Eligibility & Admission Process',
  'Career Outcomes & Job Support',
  'Fees, Scholarships & Financing',
  'The 6-Month Learning Model',
  'General Inquiry',
];

const BookCounselingPage: React.FC = () => {
  const { data: programs, isFetching: isFetchingPrograms } = usePrograms();
  const bookCounselingMutation = useBookCounseling();

  const form = useForm({
    schema: counselingSchema,
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      interestedProgram: '',
      preferredDate: '',
      preferredTime: '',
      topics: [],
      additionalInfo: '',
    },
  });

  const { setValues, values } = form;

  const handleTopicChange = (topic: string, checked: boolean) => {
    setValues((prev) => {
      const newTopics = checked
        ? [...prev.topics, topic]
        : prev.topics.filter((t) => t !== topic);
      return { ...prev, topics: newTopics };
    });
  };

  const onSubmit = (data: CounselingFormValues) => {
    bookCounselingMutation.mutate(data, {
      onSuccess: () => {
        form.setValues({
          fullName: '',
          email: '',
          phone: '',
          interestedProgram: '',
          preferredDate: '',
          preferredTime: '',
          topics: [],
          additionalInfo: '',
        });
      },
    });
  };

  if (bookCounselingMutation.isSuccess) {
    return (
      <div className={`${styles.pageContainer} ${styles.successContainer}`}>
        <CheckCircle className={styles.successIcon} size={64} />
        <h1 className={styles.successTitle}>Request Received!</h1>
        <p className={styles.successMessage}>
          Thank you for booking a counseling session. Our team will review your
          request and get in touch via your preferred contact method to confirm
          the date and time.
        </p>
        <Button onClick={() => bookCounselingMutation.reset()}>
          Book Another Session
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book Free Counseling | Edufast</title>
        <meta
          name="description"
          content="Schedule a free, no-obligation counseling session with an Edufast advisor. Get expert guidance on our 6-month degree programs and find the perfect fit for your career goals."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        <div className={styles.contentGrid}>
          <div className={styles.infoSection}>
            <UserCheck size={40} className={styles.infoIcon} />
            <h1>Speak with an Education Advisor</h1>
            <p className={styles.infoSubtitle}>
              Get personalized guidance to kickstart your 6-month degree
              journey. Our expert advisors are here to answer your questions,
              understand your goals, and help you choose the right path—all for
              free.
            </p>
            <ul className={styles.benefitsList}>
              <li>
                <CheckCircle size={18} />
                <span>Explore programs tailored to your career ambitions.</span>
              </li>
              <li>
                <CheckCircle size={18} />
                <span>Understand the accelerated 6-month learning model.</span>
              </li>
              <li>
                <CheckCircle size={18} />
                <span>Discuss financing options and scholarships.</span>
              </li>
              <li>
                <CheckCircle size={18} />
                <span>Receive a personalized eligibility assessment.</span>
              </li>
            </ul>
            
            {/* CTA after benefits list */}
            <div className={styles.benefitsCTA}>
              <StrongCTA actions={['apply', 'brochure']} layout="vertical" />
            </div>
          </div>
          <div className={styles.formContainer}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={styles.form}
              >
                <h2 className={styles.formTitle}>Book Your Free Session</h2>
                <div className={styles.formGrid}>
                  <FormItem name="fullName">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        value={values.fullName}
                        onChange={(e) =>
                          setValues((p) => ({ ...p, fullName: e.target.value }))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem name="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={values.email}
                        onChange={(e) =>
                          setValues((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem name="phone">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(123) 456-7890"
                        value={values.phone}
                        onChange={(e) =>
                          setValues((p) => ({ ...p, phone: e.target.value }))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem name="interestedProgram">
                    <FormLabel>Program of Interest (Optional)</FormLabel>
                    {isFetchingPrograms ? (
                      <Skeleton style={{ height: '2.5rem' }} />
                    ) : (
                      <Select
                        value={values.interestedProgram}
                        onValueChange={(v) =>
                          setValues((p) => ({ ...p, interestedProgram: v }))
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {programs?.map((prog) => (
                            <SelectItem key={prog.id} value={prog.title}>
                              {prog.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <FormMessage />
                  </FormItem>
                  <FormItem name="preferredDate" className={styles.gridSpan2}>
                    <FormLabel>Preferred Date</FormLabel>
                    <FormControl>
                      <div className={styles.inputWithIcon}>
                        <Calendar size={16} />
                        <Input
                          type="text"
                          placeholder="e.g., Tomorrow, Next Monday, Oct 25th"
                          value={values.preferredDate}
                          onChange={(e) =>
                            setValues((p) => ({
                              ...p,
                              preferredDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem name="preferredTime" className={styles.gridSpan2}>
                    <FormLabel>Preferred Time Slot</FormLabel>
                    <FormControl>
                      <div className={styles.inputWithIcon}>
                        <Clock size={16} />
                        <Input
                          type="text"
                          placeholder="e.g., Morning, Afternoon, Around 2 PM EST"
                          value={values.preferredTime}
                          onChange={(e) =>
                            setValues((p) => ({
                              ...p,
                              preferredTime: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem name="topics" className={styles.gridSpan2}>
                    <FormLabel>What would you like to discuss?</FormLabel>
                    <div className={styles.checkboxGroup}>
                      {TOPICS.map((topic) => (
                        <div key={topic} className={styles.checkboxItem}>
                          <FormControl>
                            <Checkbox
                              id={topic}
                              checked={values.topics.includes(topic)}
                              onChange={(e) =>
                                handleTopicChange(topic, e.target.checked)
                              }
                            />
                          </FormControl>
                          <label htmlFor={topic}>{topic}</label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                  <FormItem
                    name="additionalInfo"
                    className={styles.gridSpan2}
                  >
                    <FormLabel>Anything else we should know?</FormLabel>
                    <FormControl>
                      <div className={styles.inputWithIcon}>
                        <MessageSquare size={16} />
                        <Textarea
                          placeholder="Share any specific questions or background information here."
                          value={values.additionalInfo}
                          onChange={(e) =>
                            setValues((p) => ({
                              ...p,
                              additionalInfo: e.target.value,
                            }))
                          }
                          rows={3}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className={styles.submitButton}
                  disabled={bookCounselingMutation.isPending}
                >
                  {bookCounselingMutation.isPending && (
                    <Loader2 size={18} className={styles.spinner} />
                  )}
                  Request My Free Session
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCounselingPage;