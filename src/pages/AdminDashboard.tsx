import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Loader2,
  LogOut,
  Calendar,
  Users,
  PartyPopper,
  Wine,
  ShoppingBag,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Order = Database["public"]["Tables"]["orders"]["Row"];
type BookingStatus = Database["public"]["Enums"]["booking_status"];

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
      
      // Set up real-time subscriptions
      const bookingsChannel = supabase
        .channel("bookings-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "bookings" },
          () => {
            fetchBookings();
          }
        )
        .subscribe();

      const ordersChannel = supabase
        .channel("orders-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "orders" },
          () => {
            fetchOrders();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(bookingsChannel);
        supabase.removeChannel(ordersChannel);
      };
    }
  }, [user, isAdmin]);

  async function fetchData() {
    setLoadingData(true);
    await Promise.all([fetchBookings(), fetchOrders()]);
    setLoadingData(false);
  }

  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
      return;
    }
    setBookings(data || []);
  }

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return;
    }
    setOrders(data || []);
  }

  async function updateBookingStatus(id: string, status: BookingStatus) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update booking status");
      return;
    }
    toast.success("Booking status updated");
  }

  async function updateOrderStatus(id: string, status: BookingStatus) {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update order status");
      return;
    }
    toast.success("Order status updated");
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "confirmed":
        return <Badge className="gap-1 bg-primary"><CheckCircle className="h-3 w-3" />Confirmed</Badge>;
      case "completed":
        return <Badge className="gap-1 bg-success text-success-foreground"><CheckCircle className="h-3 w-3" />Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBookingTypeIcon = (type: string) => {
    switch (type) {
      case "venue":
        return <Calendar className="h-4 w-4" />;
      case "play_park":
        return <PartyPopper className="h-4 w-4" />;
      case "bar":
        return <Wine className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const filterBookingsByType = (type: string) => {
    return bookings.filter((b) => b.booking_type === type);
  };

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">I</span>
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Icyanzu Leisure Park</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={fetchData}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold">{stats.totalBookings}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <span className="text-3xl font-bold">{stats.pendingBookings}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold">{stats.totalOrders}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <span className="text-3xl font-bold">{stats.pendingOrders}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="venue" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Venues</span>
            </TabsTrigger>
            <TabsTrigger value="play_park" className="gap-2">
              <PartyPopper className="h-4 w-4" />
              <span className="hidden sm:inline">Play Park</span>
            </TabsTrigger>
            <TabsTrigger value="bar" className="gap-2">
              <Wine className="h-4 w-4" />
              <span className="hidden sm:inline">Bar</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">All</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Live Menu Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No orders yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Table</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-semibold">#{order.table_number}</TableCell>
                            <TableCell>{order.customer_name || "Guest"}</TableCell>
                            <TableCell className="max-w-xs">
                              <div className="text-sm">
                                {Array.isArray(order.items) && order.items.map((item: any, i: number) => (
                                  <span key={i}>
                                    {item.quantity}x {item.name}
                                    {i < (order.items as any[]).length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold">
                              {Number(order.total_amount).toLocaleString()} RWF
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {format(new Date(order.created_at), "HH:mm")}
                            </TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>
                              <Select
                                value={order.status}
                                onValueChange={(value) => updateOrderStatus(order.id, value as BookingStatus)}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Venue Bookings Tab */}
          <TabsContent value="venue">
            <BookingsTable
              title="Venue Bookings"
              icon={<Calendar className="h-5 w-5" />}
              bookings={filterBookingsByType("venue")}
              getStatusBadge={getStatusBadge}
              updateStatus={updateBookingStatus}
            />
          </TabsContent>

          {/* Play Park Tab */}
          <TabsContent value="play_park">
            <BookingsTable
              title="Play Park Bookings"
              icon={<PartyPopper className="h-5 w-5" />}
              bookings={filterBookingsByType("play_park")}
              getStatusBadge={getStatusBadge}
              updateStatus={updateBookingStatus}
            />
          </TabsContent>

          {/* Bar Tab */}
          <TabsContent value="bar">
            <BookingsTable
              title="Bar & Lounge Reservations"
              icon={<Wine className="h-5 w-5" />}
              bookings={filterBookingsByType("bar")}
              getStatusBadge={getStatusBadge}
              updateStatus={updateBookingStatus}
            />
          </TabsContent>

          {/* All Bookings Tab */}
          <TabsContent value="all">
            <BookingsTable
              title="All Bookings"
              icon={<Users className="h-5 w-5" />}
              bookings={bookings}
              getStatusBadge={getStatusBadge}
              updateStatus={updateBookingStatus}
              showType
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

interface BookingsTableProps {
  title: string;
  icon: React.ReactNode;
  bookings: Booking[];
  getStatusBadge: (status: BookingStatus) => React.ReactNode;
  updateStatus: (id: string, status: BookingStatus) => void;
  showType?: boolean;
}

function BookingsTable({ title, icon, bookings, getStatusBadge, updateStatus, showType }: BookingsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No bookings yet</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {showType && <TableHead>Type</TableHead>}
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    {showType && (
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {booking.booking_type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="font-medium">{booking.customer_name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{booking.customer_email}</div>
                        <div className="text-muted-foreground">{booking.customer_phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm max-w-xs">
                        {booking.venue_name && <div><strong>Venue:</strong> {booking.venue_name}</div>}
                        {booking.event_type && <div><strong>Event:</strong> {booking.event_type}</div>}
                        {booking.guest_count && <div><strong>Guests:</strong> {booking.guest_count}</div>}
                        {booking.children_count && <div><strong>Children:</strong> {booking.children_count}</div>}
                        {booking.adults_count && <div><strong>Adults:</strong> {booking.adults_count}</div>}
                        {booking.party_size && <div><strong>Party Size:</strong> {booking.party_size}</div>}
                        {booking.seating_preference && <div><strong>Seating:</strong> {booking.seating_preference}</div>}
                        {booking.special_requests && (
                          <div className="mt-1 text-muted-foreground"><strong>Notes:</strong> {booking.special_requests}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{format(new Date(booking.booking_date), "PPP")}</div>
                        <div className="text-muted-foreground">{booking.booking_time}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onValueChange={(value) => updateStatus(booking.id, value as BookingStatus)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
