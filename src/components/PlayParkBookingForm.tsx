import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const playParkSchema = z.object({
  parentName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  numberOfKids: z.string().min(1, "Please enter number of kids"),
  kidsAgeRange: z.string().min(1, "Please select age range"),
  visitDate: z.date({ required_error: "Please select a date" }),
  timeSlot: z.string().min(1, "Please select a time slot"),
  duration: z.string().min(1, "Please select duration"),
  preOrderSnacks: z.boolean().default(false),
  snackNotes: z.string().max(500).optional(),
});

type PlayParkFormValues = z.infer<typeof playParkSchema>;

const ageRanges = [
  "2-4 years",
  "5-7 years",
  "8-10 years",
  "11-14 years",
  "Mixed ages",
];

const timeSlots = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
];

const durations = [
  "1 hour",
  "2 hours",
  "3 hours",
  "Half day (4 hours)",
  "Full day",
];

export function PlayParkBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<PlayParkFormValues>({
    resolver: zodResolver(playParkSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      numberOfKids: "",
      kidsAgeRange: "",
      timeSlot: "",
      duration: "",
      preOrderSnacks: false,
      snackNotes: "",
    },
  });

  const watchPreOrder = form.watch("preOrderSnacks");

  async function onSubmit(data: PlayParkFormValues) {
    setIsSubmitting(true);

    const { error } = await supabase.from("bookings").insert({
      booking_type: "play_park",
      customer_name: data.parentName,
      customer_email: data.email,
      customer_phone: data.phone,
      booking_date: format(data.visitDate, "yyyy-MM-dd"),
      booking_time: data.timeSlot,
      children_count: parseInt(data.numberOfKids),
      special_requests: [
        `Age range: ${data.kidsAgeRange}`,
        `Duration: ${data.duration}`,
        data.preOrderSnacks ? `Snack order: ${data.snackNotes}` : null,
      ].filter(Boolean).join("\n"),
    });

    setIsSubmitting(false);

    if (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit booking", {
        description: "Please try again later.",
      });
      return;
    }

    setIsSuccess(true);
    toast.success("Play Park booking submitted!", {
      description: "We'll send you a confirmation email shortly.",
    });
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-success" />
        </div>
        <h3 className="font-display text-2xl font-semibold mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground mb-6">
          Get ready for fun! We'll send confirmation details to your email shortly.
        </p>
        <Button onClick={() => setIsSuccess(false)}>Make Another Booking</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent / Guardian Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jane@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+250 780 000 000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfKids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Kids</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kidsAgeRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kids Age Range</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ageRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visitDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visit Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Slot</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
          <FormField
            control={form.control}
            name="preOrderSnacks"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div>
                  <FormLabel className="text-base">Pre-Order Snacks & Drinks</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Would you like to pre-order snacks for the kids?
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {watchPreOrder && (
            <FormField
              control={form.control}
              name="snackNotes"
              render={({ field }) => (
                <FormItem className="animate-fade-in">
                  <FormLabel>Snack Preferences</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific snacks or dietary requirements..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button type="submit" size="xl" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Book Play Park Visit"
          )}
        </Button>
      </form>
    </Form>
  );
}
