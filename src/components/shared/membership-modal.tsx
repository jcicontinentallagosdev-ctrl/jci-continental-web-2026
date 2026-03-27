'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Info } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useMembershipModal } from '@/context/membership-modal-context';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  nickname: string;
  dateOfBirth: string;
  sex: string;
  location: string;
  currentEmployer: string;
  jobRole: string;
  entrepreneur: string;
  industry: string;
  wasCollegiateMember: string;
  collegiateOrg: string;
  isCurrentMember: string;
  currentOrg: string;
  howDidYouKnow: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  nickname: '',
  dateOfBirth: '',
  sex: '',
  location: '',
  currentEmployer: '',
  jobRole: '',
  entrepreneur: '',
  industry: '',
  wasCollegiateMember: '',
  collegiateOrg: '',
  isCurrentMember: '',
  currentOrg: '',
  howDidYouKnow: '',
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function MembershipModal() {
  const { open, setOpen } = useMembershipModal();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData(prev => {
        const next = { ...prev, [field]: value };
        if (field === 'wasCollegiateMember' && value === 'no') {
          next.collegiateOrg = '';
        }
        if (field === 'isCurrentMember' && value === 'no') {
          next.currentOrg = '';
        }
        return next;
      });
      if (errors[field]) {
        setErrors(prev => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.sex) newErrors.sex = 'Please select your sex';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.currentEmployer.trim())
      newErrors.currentEmployer = 'Current employer is required';
    if (!formData.wasCollegiateMember)
      newErrors.wasCollegiateMember = 'This field is required';
    if (!formData.isCurrentMember)
      newErrors.isCurrentMember = 'This field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setStatus('loading');

      try {
        const res = await fetch('/api/membership', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error('Submission failed');

        setStatus('success');
        setFormData(initialFormData);
      } catch {
        setStatus('error');
      }
    },
    [formData, validate]
  );

  const handleOpenChange = useCallback(
    (value: boolean) => {
      setOpen(value);
      if (!value) {
        setTimeout(() => {
          setStatus('idle');
          setErrors({});
          setFormData(initialFormData);
        }, 300);
      }
    },
    [setOpen]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[min(700px,95vw)] max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl p-0 gap-0 border-0 shadow-2xl">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <SuccessView onClose={() => handleOpenChange(false)} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent px-6 pt-6 pb-4">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                    Become A Member
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1">
                    Join JCI Continental Lagos and be part of a community of
                    young active citizens creating positive change.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2">
                <div className="space-y-4">
                  {/* Full Name & Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Full Name"
                      error={errors.fullName}
                      required
                    >
                      <Input
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={e => updateField('fullName', e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    <FormField
                      label="Email Address"
                      error={errors.email}
                      required
                    >
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => updateField('email', e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </FormField>
                  </div>

                  {/* Phone & Nickname */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Phone Number"
                      error={errors.phone}
                      required
                    >
                      <Input
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={e => updateField('phone', e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    <FormField label="Nickname">
                      <Input
                        placeholder="Your nickname"
                        value={formData.nickname}
                        onChange={e => updateField('nickname', e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </FormField>
                  </div>

                  {/* Date of Birth & Sex */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-default outline-none">
                              <div className="flex items-center gap-1.5">
                                <Label className="text-sm font-medium text-foreground">
                                  Date of Birth
                                  <span className="text-destructive ml-0.5">*</span>
                                </Label>
                                <Info className="h-3.5 w-3.5 text-muted-foreground" />
                              </div>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button
                                    type="button"
                                    className={cn(
                                      'flex h-11 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                                      !formData.dateOfBirth && 'text-muted-foreground'
                                    )}
                                  >
                                    {formData.dateOfBirth
                                      ? new Date(
                                          formData.dateOfBirth + 'T00:00:00'
                                        ).toLocaleDateString('en-GB', {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                        })
                                      : 'Pick a date'}
                                    <CalendarDays className="h-4 w-4 opacity-50" />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={
                                      formData.dateOfBirth
                                        ? new Date(
                                            formData.dateOfBirth + 'T00:00:00'
                                          )
                                        : undefined
                                    }
                                    onSelect={date => {
                                      if (date) {
                                        const y = date.getFullYear();
                                        const m = String(
                                          date.getMonth() + 1
                                        ).padStart(2, '0');
                                        const d = String(date.getDate()).padStart(
                                          2,
                                          '0'
                                        );
                                        updateField(
                                          'dateOfBirth',
                                          `${y}-${m}-${d}`
                                        );
                                      }
                                    }}
                                    defaultMonth={
                                      formData.dateOfBirth
                                        ? new Date(
                                            formData.dateOfBirth + 'T00:00:00'
                                          )
                                        : new Date(
                                            new Date().getFullYear() - 25,
                                            0,
                                            1
                                          )
                                    }
                                    fromYear={new Date().getFullYear() - 40}
                                    toYear={new Date().getFullYear() - 18}
                                    captionLayout="dropdown"
                                    disabled={date => {
                                      const today = new Date();
                                      const minDate = new Date(
                                        today.getFullYear() - 40,
                                        today.getMonth(),
                                        today.getDate()
                                      );
                                      const maxDate = new Date(
                                        today.getFullYear() - 18,
                                        today.getMonth(),
                                        today.getDate()
                                      );
                                      return date > maxDate || date < minDate;
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-[260px] text-center"
                          >
                            Based on the JCI Nigeria Constitution, only
                            individuals between the ages of 18 and 40 are
                            eligible for induction.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {errors.dateOfBirth && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-destructive"
                        >
                          {errors.dateOfBirth}
                        </motion.p>
                      )}
                    </div>

                    <FormField label="Sex" error={errors.sex} required>
                      <Select
                        value={formData.sex}
                        onValueChange={v => updateField('sex', v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>

                  {/* Location & Current Employer */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Location (City & Country)"
                      error={errors.location}
                      required
                    >
                      <Input
                        placeholder="e.g. Lagos, Nigeria"
                        value={formData.location}
                        onChange={e => updateField('location', e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    <FormField
                      label="Current Employer"
                      error={errors.currentEmployer}
                      required
                    >
                      <Input
                        placeholder="Your current employer"
                        value={formData.currentEmployer}
                        onChange={e =>
                          updateField('currentEmployer', e.target.value)
                        }
                        className="h-11 rounded-xl"
                      />
                    </FormField>
                  </div>

                  {/* Job Role & Entrepreneur */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Job Role">
                      <Input
                        placeholder="Your job role"
                        value={formData.jobRole}
                        onChange={e => updateField('jobRole', e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    <FormField label="Entrepreneur (Kindly state what you do)">
                      <Input
                        placeholder="What do you do?"
                        value={formData.entrepreneur}
                        onChange={e =>
                          updateField('entrepreneur', e.target.value)
                        }
                        className="h-11 rounded-xl"
                      />
                    </FormField>
                  </div>

                  {/* Industry */}
                  <FormField label="Industry">
                    <Input
                      placeholder="e.g. Technology, Finance, Healthcare"
                      value={formData.industry}
                      onChange={e => updateField('industry', e.target.value)}
                      className="h-11 rounded-xl"
                    />
                  </FormField>

                  {/* JCI Collegiate Member */}
                  <FormField
                    label="Were you a JCI Collegiate member while an undergraduate?"
                    error={errors.wasCollegiateMember}
                    required
                  >
                    <Select
                      value={formData.wasCollegiateMember}
                      onValueChange={v =>
                        updateField('wasCollegiateMember', v)
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>

                  {formData.wasCollegiateMember === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <FormField label="If Yes, What Collegiate Local Organisation did you belong to?">
                        <Input
                          placeholder="Your Collegiate Local Organisation"
                          value={formData.collegiateOrg}
                          onChange={e =>
                            updateField('collegiateOrg', e.target.value)
                          }
                          className="h-11 rounded-xl"
                        />
                      </FormField>
                    </motion.div>
                  )}

                  {/* Current Member of another LO */}
                  <FormField
                    label="Are you currently a member of another Local Organisation?"
                    error={errors.isCurrentMember}
                    required
                  >
                    <Select
                      value={formData.isCurrentMember}
                      onValueChange={v => updateField('isCurrentMember', v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>

                  {formData.isCurrentMember === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <FormField label="If yes, what Local Organisation do you currently belong to?">
                        <Input
                          placeholder="Your Local Organisation"
                          value={formData.currentOrg}
                          onChange={e =>
                            updateField('currentOrg', e.target.value)
                          }
                          className="h-11 rounded-xl"
                        />
                      </FormField>
                    </motion.div>
                  )}

                  {/* How did you know */}
                  <FormField
                    label="How did you get to know about this Local Organisation?"
                    description="If you were referred by a friend, kindly write the person's name."
                  >
                    <Input
                      placeholder="Your answer"
                      value={formData.howDidYouKnow}
                      onChange={e =>
                        updateField('howDidYouKnow', e.target.value)
                      }
                      className="h-11 rounded-xl"
                    />
                  </FormField>
                </div>

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-3"
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-6 h-12 rounded-xl text-base font-semibold"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner />
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function FormField({
  label,
  error,
  required,
  description,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {description && (
        <p className="text-xs text-muted-foreground italic">{description}</p>
      )}
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
        <svg
          className="w-8 h-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">
        Application Submitted!
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-8">
        Thank you for your interest in JCI Continental Lagos. We&apos;ll review
        your application and get back to you soon.
      </p>
      <Button onClick={onClose} className="rounded-xl px-8 h-11">
        Done
      </Button>
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
