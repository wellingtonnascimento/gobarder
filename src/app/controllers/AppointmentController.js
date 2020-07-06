import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointment';

class AppointmentController {
  async index(req, res) {
    const appointment = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
    });

    return res.json(appointment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    /**
     * Check if provider_id is a
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    const hourStrat = startOfHour(parseISO(date));

    /**
     * Check for past dates
     */
    if (isBefore(hourStrat, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * Check date availability
     */

    const checkAvailabitity = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStrat,
      },
    });

    if (checkAvailabitity) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    try {
      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date,
      });

      return res.json(appointment);
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

export default new AppointmentController();
