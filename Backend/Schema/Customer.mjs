import mongoose from 'mongoose';

const packageBookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    numberOfTravelers: {
      type: Number,
      required: true,
      min: 1,
    },
    specialRequests: {
      type: String,
      default: '',
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TourPackage',
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    invoice: {
      type: Object,
      required: true,
      default: {},
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create a method to generate an invoice
packageBookingSchema.methods.generateInvoice = function () {
  const invoice = {
    customerDetails: {
      name: this.customerName,
      email: this.customerEmail,
      phone: this.customerPhone,
    },
    packageDetails: {
      packageId: this.packageId,
      totalPrice: this.totalPrice,
      numberOfTravelers: this.numberOfTravelers,
    },
    totalAmount: this.totalPrice,
    date: new Date(),
  };
  this.invoice = invoice;
  return this.invoice;  // Return the invoice
};

// Create and export the model
const PackageBooking = mongoose.model('PackageBooking', packageBookingSchema);
export default PackageBooking;
