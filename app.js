const app = Vue.createApp({
    data() {
        return {
            name: '',
            mobile: '',
            confirmed: false,
            applicableCoupon: null,
            coupon: '',
            cuoponCode: [
                {
                    code: '100TAKA',
                    discount: 100
                },
                {
                    code: '200TAKA',
                    discount: 200
                }
            ],
            seat_status: {
                sold: {
                    text: 'Sold',
                    color: 'red'
                },
                available: {
                    text: 'Available',
                    color: 'white'
                },
                booked: {
                    text: 'Booked',
                    color: 'grey'
                },
                selected: {
                    text: 'Selected',
                    color: 'green'
                }
            },
            seats: [
                {
                    name: "A1",
                    type: "available",
                    price: 500
                },
                {
                    name: "A2",
                    type: "available",
                    price: 500
                },
                {
                    name: "A3",
                    type: "available",
                    price: 500
                },
                {
                    name: "A4",
                    type: "available",
                    price: 500
                },
                {
                    name: "B1",
                    type: "available",
                    price: 450
                },
                {
                    name: "B2",
                    type: "available",
                    price: 450
                },
                {
                    name: "B3",
                    type: "available",
                    price: 450
                },
                {
                    name: "B4",
                    type: "available",
                    price: 450
                },
                {
                    name: "C1",
                    type: "sold",
                    price: 500
                },
                {
                    name: "C2",
                    type: "sold",
                    price: 500
                },
                {
                    name: "C3",
                    type: "sold",
                    price: 500
                },
                {
                    name: "C4",
                    type: "sold",
                    price: 500
                },
                {
                    name: "D1",
                    type: "available",
                    price: 400
                },
                {
                    name: "D2",
                    type: "available",
                    price: 400
                },
                {
                    name: "D3",
                    type: "available",
                    price: 400
                },
                {
                    name: "D4",
                    type: "available",
                    price: 400
                },
                {
                    name: "E1",
                    type: "available",
                    price: 300
                },
                {
                    name: "E2",
                    type: "available",
                    price: 300
                },
                {
                    name: "E3",
                    type: "booked",
                    price: 300
                },
                {
                    name: "E4",
                    type: "booked",
                    price: 300
                },
                {
                    name: "F1",
                    type: "available",
                    price: 300
                },
                {
                    name: "F2",
                    type: "available",
                    price: 300
                },
                {
                    name: "F3",
                    type: "available",
                    price: 300
                },
                {
                    name: "F4",
                    type: "available",
                    price: 300
                },
                {
                    name: "G1",
                    type: "available",
                    price: 300
                },
                {
                    name: "G2",
                    type: "available",
                    price: 300
                },
                {
                    name: "G3",
                    type: "available",
                    price: 300
                },
                {
                    name: "G4",
                    type: "available",
                    price: 300
                },
                {
                    name: "H1",
                    type: "available",
                    price: 300
                },
                {
                    name: "H2",
                    type: "available",
                    price: 300
                },
                {
                    name: "H3",
                    type: "available",
                    price: 300
                },
                {
                    name: "H4",
                    type: "available",
                    price: 300
                },
                {
                    name: "I1",
                    type: "available",
                    price: 300
                },
                {
                    name: "I2",
                    type: "available",
                    price: 300
                },
                {
                    name: "I3",
                    type: "available",
                    price: 300
                },
                {
                    name: "I4",
                    type: "available",
                    price: 300
                }
            ]
        }
    },
    computed: {
        select_seats() {
            let seats = this.seats.filter((item) => {
                return item.type === 'selected';
            })
            return seats;
        },
        totalCost() {
            let total = 0;
            this.select_seats.forEach((item) => {
                total = total + item.price
            });
            if (this.applicableCoupon !== null) {
                total = total - this.applicableCoupon.discount
            }
            return total;
        },

    },
    methods: {
        handleClick(index) {
            let selectedClicked = this.seats[index];
            if (selectedClicked.type === 'sold' || selectedClicked.type === 'booked') {
                alert('You are not selected for this seats');
                return;
            }
            selectedClicked.type = selectedClicked.type === 'selected' ? 'available' : 'selected';
            if (this.select_seats.length > 4) {
                alert('You are not selected more than 3 sits');
                selectedClicked.type = selectedClicked.type === 'selected' ? 'available' : 'selected';
                return;
            }
        },
        handleConfirm(e) {
            if (!this.name || !this.mobile) {
                alert('Please enter name and mobile');
                return;
            }
            else {
                this.confirmed = true;
                return;
            }
        },
        bookAgain() {
            this.name = '',
                this.mobile = '',
                this.confirmed = false;
            this.applicableCoupon = null;

            this.select_seats.forEach((item) => {
                if (item.type === 'selected') {
                    item.type = 'sold';
                    return
                }
            })
        }

    },
    watch: {
        coupon(newValue, oldValue) {
            if (newValue.length === 7) {
                let validCoupon = this.cuoponCode.filter((item) => {
                    return item.code === newValue
                });
                if (validCoupon.length === 1) {
                    this.applicableCoupon = validCoupon[0],
                        this.coupon = ''
                }
                else {
                    alert('Not a valid Coupon');
                }
            }
        },
    }
})
app.mount('#app')