import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        numEnrolledStudents: Number,
    },
    price : {
        type: Number,
        required: true,
        min: 0,
        max: 2000,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'EGP'],
        default: 'EGP',
    },
    frequency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
    },
    // category: {
    //     type: String,
    //     enum: ['Mathematical Science', 'Biological Science', 'Literature'],
    // },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Expired', 'Cancelled'],
        default: 'Active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= Date.now(),
            message: 'Start date must not be in the future',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be in the future',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, {timestamps: true});


// Calculate the renewal Date if missing
subscriptionSchema.pre('save', async function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            Daily: 1,
            Weekly: 7,
            Monthly: 30,
            Yearly: 360,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate && this.renewalDate < new Date()){
        this.status = 'Expired';
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;