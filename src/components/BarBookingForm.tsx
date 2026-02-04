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

const barBookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  visitDate: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please select a time"),
  numberOfPeople: z.string().min(1, "Please enter number of people"),
  tablePreference: z.string().min(1, "Please select table preference"),
  preOrderDrinks: z.boolean().default(false),
  drinkNotes: z.string().max(500).optional(),
  specialRequests: z.string().max(500).optional(),
});

type BarBookingFormValues = z.infer<typeof barBookingSchema>;

const timeSlots = [
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM",
];

const tablePreferences = [
  "Indoor - Near Bar",
  "Indoor - Quiet Corner",
  "Outdoor - Terrace",
  "Outdoor - Garden View",
  "Outdoor - Mountain View",
  "No Preference",
];

export function BarBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<BarBookingFormValues>({
    resolver: zodResolver(barBookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      time: "",
      numberOfPeople: "",
      tablePreference: "",
      preOrderDrinks: false,
      drinkNotes: "",
      specialRequests: "",
    },
  });

  const watchPreOrder = form.watch("preOrderDrinks");

  async function onSubmit(data: BarBookingFormValues) {
    setIsSubmitting(true);

    const { error } = await supabase.from("bookings").insert({
      booking_type: "bar",
      customer_name: data.fullName,
      customer_email: data.email,
      customer_phone: data.phone,
      booking_date: format(data.visitDate, "yyyy-MM-dd"),
      booking_time: data.time,
      party_size: parseInt(data.numberOfPeople),
      seating_preference: data.tablePreference,
      special_requests: [
        data.specialRequests,
        data.preOrderDrinks ? `Pre-order drinks: ${data.drinkNotes}` : null,
      ].filter(Boolean).join("\n"),
    });

    setIsSubmitting(false);

    if (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit reservation", {
        description: "Please try again later.",
      });
      return;
    }

    setIsSuccess(true);
    toast.success("Table reservation submitted!", {
      description: "We'll confirm your booking shortly.",
    });
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-success" />
        </div>
        <h3 className="font-display text-2xl font-semibold mb-2">Reservation Confirmed!</h3>
        <p className="text-muted-foreground mb-6">
          Your table is being prepared. Check your email for confirmation details.
        </p>
        <Button onClick={() => setIsSuccess(false)}>Make Another Reservation</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                  <Input type="email" placeholder="john@example.com" {...field} />
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
            name="numberOfPeople"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of People</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="4" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visitDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
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
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tablePreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Table Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred seating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tablePreferences.map((pref) => (
                    <SelectItem key={pref} value={pref}>
                      {pref}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
          <FormField
            control={form.control}
            name="preOrderDrinks"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div>
                  <FormLabel className="text-base">Pre-Order Drinks & Food</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Have your favorites ready when you arrive
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
              name="drinkNotes"
              render={({ field }) => (
                <FormItem className="animate-fade-in">
                  <FormLabel>Pre-Order Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List your drinks and food preferences..."
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

        <FormField
          control={form.control}
          name="specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special occasions or requirements..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="xl" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Reserving...
            </>
          ) : (
            "Reserve Table"
          )}
        </Button>
      </form>
    </Form>
  );
}
