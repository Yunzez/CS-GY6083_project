export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { firstname, lastname, email, password } = req.body;
    console.log(req.body)
    if (!firstname || !lastname || !email || !password) {
        const missingFields = [];

        if (!firstname) {
            missingFields.push('firstname');
        }

        if (!lastname) {
            missingFields.push('lastname');
        }

        if (!email) {
            missingFields.push('email');
        }

        if (!password) {
            missingFields.push('password');
        }

        if (missingFields.length > 0) {
            res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
            return;
        }
        res.status(400).json({ message: 'unknown error' });
        return;
    }

    // TODO: Implement user signup logic here.

    res.status(200).json({ message: 'User signed up successfully' });
}
