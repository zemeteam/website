export default async(req, res) => {
    const method = req.method

    switch(method) {
        default:
            res.setHeader('Allow', [])
            res.status(405).end(`Method ${method} not supported.`)
    }
}