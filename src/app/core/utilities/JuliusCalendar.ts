export class JuliusCalendar {
    static PI = Math.PI;
    static INT(d) {
        return Math.floor(d);
    }

    static convertDateToTh(day, month, year) {
        // const n1 = JuliusCalendar.convertLunar2Solar(10, 3, 2020, 0, 7);
        // const n2 = JuliusCalendar.convertLunar2Solar(1, 1, 2020, 0, 7);
        // const t1 = JuliusCalendar.convertDateToTh(5,0,2020);
        // console.log('Ngày 10/3: ', n1);
        // console.log('Ngày 1/1: ', n2);
        // console.log('Thứ 16/12/2020: ', t1);
        const nDate = new Date(year, month, day);
        return nDate.getDay();
    }

    static jdFromDate(dd, mm, yy) {
        //Integer[] a = convertSolar2Lunar(23, 9, 2016, 7);
        //System.out.println(a[0] + "  " + a[1] + "  " + a[2]);

        var a, y, m, jd;
        a = JuliusCalendar.INT((14 - mm) / 12);
        y = yy + 4800 - a;
        m = mm + 12 * a - 3;
        jd =
            dd +
            JuliusCalendar.INT((153 * m + 2) / 5) +
            365 * y +
            JuliusCalendar.INT(y / 4) -
            JuliusCalendar.INT(y / 100) +
            JuliusCalendar.INT(y / 400) -
            32045;
        if (jd < 2299161) {
            jd =
                dd +
                JuliusCalendar.INT((153 * m + 2) / 5) +
                365 * y +
                JuliusCalendar.INT(y / 4) -
                32083;
        }
        return jd;
    }

    static jdToDate(jd) {
        var a, b, c, d, e, m, day, month, year;
        if (jd > 2299160) {
            // After 5/10/1582, Gregorian calendar
            a = jd + 32044;
            b = JuliusCalendar.INT((4 * a + 3) / 146097);
            c = a - JuliusCalendar.INT((b * 146097) / 4);
        } else {
            b = 0;
            c = jd + 32082;
        }
        d = JuliusCalendar.INT((4 * c + 3) / 1461);
        e = c - JuliusCalendar.INT((1461 * d) / 4);
        m = JuliusCalendar.INT((5 * e + 2) / 153);
        day = e - JuliusCalendar.INT((153 * m + 2) / 5) + 1;
        month = m + 3 - 12 * JuliusCalendar.INT(m / 10);
        year = b * 100 + d - 4800 + JuliusCalendar.INT(m / 10);
        return new Array(day, month, year);
    }

    static getNewMoonDay(k, timeZone) {
        var T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
        T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
        T2 = T * T;
        T3 = T2 * T;
        dr = JuliusCalendar.PI / 180;
        Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
        Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
        M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun's mean anomaly
        Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon's mean anomaly
        F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon's argument of latitude
        C1 =
            (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
            0.0021 * Math.sin(2 * dr * M);
        C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
        C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
        C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
        C1 =
            C1 -
            0.0074 * Math.sin(dr * (M - Mpr)) +
            0.0004 * Math.sin(dr * (2 * F + M));
        C1 =
            C1 -
            0.0004 * Math.sin(dr * (2 * F - M)) -
            0.0006 * Math.sin(dr * (2 * F + Mpr));
        C1 =
            C1 +
            0.001 * Math.sin(dr * (2 * F - Mpr)) +
            0.0005 * Math.sin(dr * (2 * Mpr + M));
        if (T < -11) {
            deltat =
                0.001 +
                0.000839 * T +
                0.0002261 * T2 -
                0.00000845 * T3 -
                0.000000081 * T * T3;
        } else {
            deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
        }
        JdNew = Jd1 + C1 - deltat;
        return JuliusCalendar.INT(JdNew + 0.5 + timeZone / 24);
    }

    static getSunLongitude(jdn, timeZone) {
        var T, T2, dr, M, L0, DL, L;
        T = (jdn - 2451545.5 - timeZone / 24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
        T2 = T * T;
        dr = JuliusCalendar.PI / 180; // degree to radian
        M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
        L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
        DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
        DL =
            DL +
            (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
            0.00029 * Math.sin(dr * 3 * M);
        L = L0 + DL; // true longitude, degree
        L = L * dr;
        L =
            L -
            JuliusCalendar.PI * 2 * JuliusCalendar.INT(L / (JuliusCalendar.PI * 2)); // Normalize to (0, 2*PI)
        return JuliusCalendar.INT((L / JuliusCalendar.PI) * 6);
    }

    static getLunarMonth11(yy, timeZone) {
        var k, off, nm, sunLong;
        off = JuliusCalendar.jdFromDate(31, 12, yy) - 2415021;
        k = JuliusCalendar.INT(off / 29.530588853);
        nm = JuliusCalendar.getNewMoonDay(k, timeZone);
        sunLong = JuliusCalendar.getSunLongitude(nm, timeZone); // sun longitude at local midnight
        if (sunLong >= 9) {
            nm = JuliusCalendar.getNewMoonDay(k - 1, timeZone);
        }
        return nm;
    }

    static getLeapMonthOffset(a11, timeZone) {
        var k, last, arc, i;
        k = JuliusCalendar.INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        last = 0;
        i = 1; // We start with the month following lunar month 11
        arc = JuliusCalendar.getSunLongitude(
            JuliusCalendar.getNewMoonDay(k + i, timeZone),
            timeZone,
        );
        do {
            last = arc;
            i++;
            arc = JuliusCalendar.getSunLongitude(
                JuliusCalendar.getNewMoonDay(k + i, timeZone),
                timeZone,
            );
        } while (arc != last && i < 14);
        return i - 1;
    }
    static convertSolar2Lunar(dd, mm, yy, timeZone) {
        var k,
            dayNumber,
            monthStart,
            a11,
            b11,
            lunarDay,
            lunarMonth,
            lunarYear,
            lunarLeap;
        dayNumber = JuliusCalendar.jdFromDate(dd, mm, yy);
        k = JuliusCalendar.INT((dayNumber - 2415021.076998695) / 29.530588853);
        monthStart = JuliusCalendar.getNewMoonDay(k + 1, timeZone);
        if (monthStart > dayNumber) {
            monthStart = JuliusCalendar.getNewMoonDay(k, timeZone);
        }
        a11 = JuliusCalendar.getLunarMonth11(yy, timeZone);
        b11 = a11;
        if (a11 >= monthStart) {
            lunarYear = yy;
            a11 = JuliusCalendar.getLunarMonth11(yy - 1, timeZone);
        } else {
            lunarYear = yy + 1;
            b11 = JuliusCalendar.getLunarMonth11(yy + 1, timeZone);
        }
        lunarDay = dayNumber - monthStart + 1;
        let diff = JuliusCalendar.INT((monthStart - a11) / 29);
        lunarLeap = 0;
        lunarMonth = diff + 11;
        if (b11 - a11 > 365) {
            let leapMonthDiff = JuliusCalendar.getLeapMonthOffset(a11, timeZone);
            if (diff >= leapMonthDiff) {
                lunarMonth = diff + 10;
                if (diff == leapMonthDiff) {
                    lunarLeap = 1;
                }
            }
        }
        if (lunarMonth > 12) {
            lunarMonth = lunarMonth - 12;
        }
        if (lunarMonth >= 11 && diff < 4) {
            lunarYear -= 1;
        }
    }

    static convertLunar2Solar(
        lunarDay,
        lunarMonth,
        lunarYear,
        lunarLeap,
        timeZone,
    ) {
        var k, a11, b11, off, leapOff, leapMonth, monthStart;
        if (lunarMonth < 11) {
            a11 = JuliusCalendar.getLunarMonth11(lunarYear - 1, timeZone);
            b11 = JuliusCalendar.getLunarMonth11(lunarYear, timeZone);
        } else {
            a11 = JuliusCalendar.getLunarMonth11(lunarYear, timeZone);
            b11 = JuliusCalendar.getLunarMonth11(lunarYear + 1, timeZone);
        }
        off = lunarMonth - 11;
        if (off < 0) {
            off += 12;
        }
        if (b11 - a11 > 365) {
            leapOff = JuliusCalendar.getLeapMonthOffset(a11, timeZone);
            leapMonth = leapOff - 2;
            if (leapMonth < 0) {
                leapMonth += 12;
            }
            if (lunarLeap != 0 && lunarMonth != leapMonth) {
                return new Array(0, 0, 0);
            } else if (lunarLeap != 0 || off >= leapOff) {
                off += 1;
            }
        }
        k = JuliusCalendar.INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
        monthStart = JuliusCalendar.getNewMoonDay(k + off, timeZone);
        return JuliusCalendar.jdToDate(monthStart + lunarDay - 1);
    }
}
