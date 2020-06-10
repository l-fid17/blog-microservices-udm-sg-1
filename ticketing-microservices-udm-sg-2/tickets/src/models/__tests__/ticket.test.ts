import {Ticket} from "../ticket";

it('implements optimistic concurrency control', async (done) => {
    // create an instance of a ticket
    const ticket = Ticket.build({
        title: 'test',
        price: 5,
        userID: 'userid'
    })
    // save ticket to db
    await ticket.save()

    //fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id)
    const secondInstance = await Ticket.findById(ticket.id)

    // make two separate changes to the tickets we fetched
    firstInstance!.set({price: 10})
    secondInstance!.set({price: 15})

    // save the first ticket
    await firstInstance!.save()

    // save the second ticket and expect an error
    // workaround for jest
    try {
        await secondInstance!.save()
    } catch (e) {
        return done()
    }

    throw new Error('Should not reach this line')
    // expect(async () => {
    //     await secondInstance!.save()
    // }).toThrow()
})