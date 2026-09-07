# BossKeys — Payment Setup & Lesson Management Guide

This document outlines the step-by-step process for enabling online payments through Cal.com (via Stripe), handling lesson fees, managing student cancellations/reschedules, and applying lesson credits for recurring students.

---

## 1. How to Set Up Payments in Cal.com (Step-by-Step)

Cal.com does **not** charge a monthly subscription to enable payments. You only pay standard credit card processing fees via Stripe when a transaction occurs.

### Step 1: Connect Stripe to Cal.com
1. Log into your Cal.com dashboard at [app.cal.com](https://app.cal.com).
2. In the left sidebar, click **Apps** (`app.cal.com/apps`).
3. Search for **Stripe** and click **Install / Connect**.
4. Log into your existing Stripe account or create a new free Stripe account (which links directly to your bank account for automatic payouts).

### Step 2: Configure Pricing on Each Event Type
Once Stripe is connected, set the price for each lesson type:

1. Go to **Event Types** (`app.cal.com/event-types`).
2. Click on **In-Studio Lesson ($15)**:
   - In the left menu, click **Payments & Seats**.
   - Enable **Require payment for bookings**.
   - Currency: **USD ($)**.
   - Price: **15.00**.
   - Click **Save** in the top right.
3. Click on **In-Home Lesson ($20)**:
   - In the left menu, click **Payments & Seats**.
   - Enable **Require payment for bookings**.
   - Currency: **USD ($)**.
   - Price: **20.00**.
   - Click **Save** in the top right.
4. Click on **⭐ First Lesson (Free)**:
   - Make sure **Require payment** remains **OFF / Disabled**.

---

## 2. Payment Math & Fees Breakdown

* **Cal.com Software Fee:** **$0 / month** (free forever).
* **Credit Card Processing Fee (Stripe standard):** **2.9% + $0.30** per transaction.

| Lesson Type | Listed Price | Stripe Processing Fee | Net Deposited to Your Bank |
| :--- | :--- | :--- | :--- |
| **⭐ First Lesson** | **FREE ($0.00)** | $0.00 | **$0.00** |
| **In-Studio Lesson** | **$15.00** | ~$0.74 | **$14.26** |
| **In-Home Lesson** | **$20.00** | ~$0.88 | **$19.12** |

---

## 3. Cancellation, Rescheduling & Refund Rules

### Studio Policy (As Listed on BossKeys):
> *"Life happens! With at least **24 hours notice**, you can reschedule your lesson or roll your payment over as a credit toward your next lesson. Cancellations with less than 24 hours notice or no-shows are non-refundable."*

### Why Automatic Refunds Should Stay OFF:
* When a full refund is processed through Stripe, Stripe returns the entire $15 or $20 to the student, but does **not** return the ~74¢ transaction fee.
* Keeping automatic refunds off protects your reserved calendar slots from last-minute dropouts and saves you from losing transaction fees.

---

## 4. How to Roll Over Payment / Apply Lesson Credits (Option 1)

When a recurring student gives more than 24 hours notice that they need to miss a weekly lesson (e.g., Tuesday at 9:00 AM) and cannot reschedule to another day that week:

### Teacher Manual Booking (10-Second Free Credit Workflow):
1. The student does **not** need to go to the website or re-enter their credit card.
2. Open your **Google Calendar** or **Cal.com Bookings** dashboard.
3. Simply create or confirm their next appointment slot manually for the following week.
4. **Because you (the teacher) schedule the booking directly, Cal.com bypasses payment checkout entirely.**
5. The student receives their normal confirmation email and calendar invite for free, and their previous payment counts as their credit!

---

## 5. Recommended Studio Model for Regular Weekly Students

* **New Students (Website Booking):**
  - Use [boss-keys.web.app/scheduling.html](https://boss-keys.web.app/scheduling.html) to book the free trial or introductory lesson.
* **Established Weekly Students:**
  - Block off their recurring weekly time slot permanently on your Google Calendar.
  - Bill regular students monthly (e.g., $60/month for four 30-min studio lessons) via Venmo, Cash, Zelle, or a monthly Stripe recurring invoice.
  - If a student cancels an excused lesson with 24+ hours notice, simply subtract $15 from their next month's invoice!
