import { Alert } from '../../interface/alert';
import { prisma } from '../../prisma/prismaConfig';

class AlertRepository {
  async create({ category, description, lat, long }: Alert): Promise<Alert> {
    const newAlert = await prisma.alert.create({
      data: {
        category,
        description,
        lat,
        long,
      },
    });
    console.log(newAlert);

    return newAlert;
  }

  async update({ id, status }: Pick<Alert, 'id' | 'status'>): Promise<Alert> {
    const updatedAlert = await prisma.alert.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return updatedAlert;
  }

  async delete(id: string): Promise<void> {
    await prisma.alert.delete({
      where: {
        id,
      },
    });

    return;
  }

  async findAll(): Promise<Alert[]> {
    const alerts = await prisma.alert.findMany();
    return alerts;
  }

  async findById(id: string): Promise<Alert> {
    const alert = await prisma.alert.findUnique({
      where: {
        id,
      },
    });

    if (!alert?.id) {
      throw new Error('Alert not found');
    }

    return alert;
  }
}

export default new AlertRepository();
