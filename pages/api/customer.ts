import { postNewCustomer } from '../../services/customer';

const handler = async (req, res) => {
  try {
    const response = await postNewCustomer(req.body);
    res.status(200).json(response);
  } catch (error) {
    if (error.response.data) {
      res.status(error.status || 400).send(error.response.data);
    }
    return res.status(400).send(error);
  }
};

export default handler;
