import { Request, Response } from 'express';
import { Alert } from '../../interface/alert';
import AlertRepository from '../repositories/AlertRepository';

class AlertController {
  async store(req: Request, res: Response): Promise<Response> {
    const { category, description, lat, long } = req.body as Alert;
    console.log(req.body);

    if (!category) {
      return res.status(400).json({ error: 'category is required' });
    }
    if (!description) {
      return res.status(400).json({ error: 'description is required' });
    }
    if (!lat || !long) {
      return res
        .status(400)
        .json({ error: 'Latitude and longitude is required' });
    }

    try {
      const Alert = await AlertRepository.create({
        category,
        description,
        lat,
        long,
      });

      return res.status(202).json(Alert);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: `${error}` });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const Alerts = await AlertRepository.findAll();

      return res.json(Alerts);
    } catch (error) {
      return res.status(400).json({ message: `${error}` });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const Alert = await AlertRepository.findById(id);

      return res.json(Alert);
    } catch (error) {
      return res.status(400).json({ message: `${error}` });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.body as Alert;

    try {
      const Alert = await AlertRepository.update({
        id,
        status,
      });

      return res.json(Alert);
    } catch (error) {
      return res.status(400).json({ message: `${error}` });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const Alert = await AlertRepository.delete(id);

      return res.json(Alert);
    } catch (error) {
      return res.status(400).json({ message: `${error}` });
    }
  }
}

export default new AlertController();
