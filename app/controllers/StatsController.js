import { Op } from 'sequelize';
import Reservation from '../models/Reservation.js';
import Payment from '../models/Payment.js';

export const getReservationStats = async (req, res) => {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const yearStart = new Date(today.getFullYear(), 0, 1);

    const dailyReservations = await Reservation.count({
      where: {
        date_start: {
          [Op.between]: [yesterday, today],
        },
      },
    });

    const monthlyReservations = await Reservation.count({
      where: {
        date_start: {
          [Op.gte]: lastMonthStart,
        },
      },
    });

    const yearlyReservations = await Reservation.count({
      where: {
        date_start: {
          [Op.gte]: yearStart,
        },
      },
    });

    const dailyRevenue = await Payment.sum('amount', {
      where: {
        date_amount: {
          [Op.between]: [yesterday, today],
        },
      },
    });

    const monthlyRevenue = await Payment.sum('amount', {
      where: {
        date_amount: {
          [Op.gte]: lastMonthStart,
        },
      },
    });

    const yearlyRevenue = await Payment.sum('amount', {
      where: {
        date_amount: {
          [Op.gte]: yearStart,
        },
      },
    });

    res.status(200).json({
      dailyRate: dailyReservations,
      monthlyRate: monthlyReservations,
      yearlyRate: yearlyReservations,
      dailyRevenue: dailyRevenue || 0,
      monthlyRevenue: monthlyRevenue || 0,
      yearlyRevenue: yearlyRevenue || 0,
    });
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques :', error);
    res.status(500).json({ message: 'Erreur lors du calcul des statistiques.' });
  }
};
