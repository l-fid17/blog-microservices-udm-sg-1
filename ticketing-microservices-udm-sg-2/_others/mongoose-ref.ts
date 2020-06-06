// associate an existing Order and Ticket together
const ticket = await Ticket.findOne({})
const order = await Order.findOne({})

order.ticket = ticket
await order.save()

// associate an existing Ticket with a new Order
const ticket = await Ticket.findOne({''})
const order = Order.build({
    ticket: ticket,
    userId: 'userid'
    status: OrderStatus.Created,
    expiresAr: 'expirationdate'
})

// to fetch and order
const order = await Order.findById('orderidhere').populate('ticket')