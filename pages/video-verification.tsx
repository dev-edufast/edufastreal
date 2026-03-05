import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { toast } from 'sonner';
import type { DegreeCategory } from '../helpers/schema';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '../components/Form';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/Select';
import { Calendar } from '../components/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/Popover';
import { schema as videoVerificationSchema, TIME_SLOTS } from '../endpoints/video-verification_POST.schema';
import { useVideoVerification } from '../helpers/useVideoVerification';

import { DegreeCategoryArrayValues } from '../helpers/schema';

type TimeSlot = typeof TIME_SLOTS[number];
import { Calendar as CalendarIcon, CheckCircle, Loader2 } from 'lucide-react';

import styles from './video-verification.module.css';

const VideoVerificationPage: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const videoVerificationMutation = useVideoVerification();


  const form = useForm({
    schema: videoVerificationSchema,
    defaultValues: {
      studentName: '',
      contactNumber: '',
      email: '',
      courseCategory: undefined,

      preferredDate: undefined,
      preferredTimeSlot: undefined,
    },
  });

  const { setValues, values } = form;

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTime(timeSlot);
    setValues((prev) => ({ ...prev, preferredTimeSlot: timeSlot }));
    form.validateField('preferredTimeSlot');
  };

  const onSubmit = (data: z.infer<typeof videoVerificationSchema>) => {
    videoVerificationMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Verification Scheduled!', {
          description: 'Your phone call verification slot has been booked. Please check your email for confirmation.',
        });
      },
      onError: (error) => {
        toast.error('Scheduling Failed', {
          description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        });
      },
    });
  };

  if (videoVerificationMutation.isSuccess) {
    return (
      <div className={`${styles.container} ${styles.successContainer}`}>
        <CheckCircle className={styles.successIcon} size={64} />
        <h1 className={styles.successTitle}>Slot Booked Successfully!</h1>
        <p className={styles.successMessage}>
          Your phone call verification has been scheduled. A confirmation email with the call details has been sent to{' '}
          <strong>{values.email}</strong>.
        </p>
        <Button onClick={() => videoVerificationMutation.reset()}>
          Schedule Another Verification
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Phone Call Verification | Edufast</title>
        <meta
          name="description"
          content="Schedule your phone call verification with an Edufast counselor to complete your application process."
        />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>
            Phone Call <span className={styles.highlight}>Verification</span>
          </h1>
          <p>
            Schedule a phone call with our counselor to complete your verification process.
          </p>
        </div>

        <div className={styles.formWrapper}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formGrid}>
              <FormItem name="studentName">
                <FormLabel>Name of the Student *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John doe"
                    value={values.studentName}
                    onChange={(e) => setValues((p) => ({ ...p, studentName: e.target.value }))}
                    disabled={videoVerificationMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="contactNumber">
                <FormLabel>Student contact number *</FormLabel>
                <div className={styles.phoneInputWrapper}>
                  <span className={styles.phonePrefix}>+91</span>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      value={values.contactNumber}
                      onChange={(e) => setValues((p) => ({ ...p, contactNumber: e.target.value }))}
                      disabled={videoVerificationMutation.isPending}
                      className={styles.phoneInput}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>

              <FormItem name="email">
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Johndoe@email.com"
                    value={values.email}
                    onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))}
                    disabled={videoVerificationMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="courseCategory">
                <FormLabel>Course Category *</FormLabel>
                <Select
                  value={values.courseCategory || ''}
                  onValueChange={(v) => setValues((p) => ({ ...p, courseCategory: v as DegreeCategory }))}
                  disabled={videoVerificationMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="_empty">Select course category</SelectItem>
                    {DegreeCategoryArrayValues.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>


              <FormItem name="preferredDate" className={styles.gridSpan2}>
                <FormLabel>Choose preferred date *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={styles.datePickerTrigger}
                        disabled={videoVerificationMutation.isPending}
                      >
                        <CalendarIcon size={16} />
                        {values.preferredDate ? (
                          values.preferredDate.toLocaleDateString()
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent removeBackgroundAndPadding>
                    <Calendar
                      mode="single"
                      selected={values.preferredDate}
                      onSelect={(d) => setValues((p) => ({ ...p, preferredDate: d as Date }))}
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>

              <FormItem name="preferredTimeSlot" className={styles.gridSpan2}>
                <FormLabel>Time slot selection *</FormLabel>
                <div className={styles.timeSlotGrid}>
                  {TIME_SLOTS.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={selectedTime === slot ? 'primary' : 'outline'}
                      onClick={() => handleTimeSlotSelect(slot)}
                      disabled={videoVerificationMutation.isPending}
                      className={styles.timeSlotButton}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>

              <div className={styles.submitContainer}>
                <Button type="submit" size="lg" disabled={videoVerificationMutation.isPending}>
                  {videoVerificationMutation.isPending && (
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

export default VideoVerificationPage;