const { notification, villagePeople } = require("../../Dbconfig/DatabaseConfig");
const sendPushNotification = require("./pushNotification");

const banglaMonths = {
  January: "জানুয়ারি",
  February: "ফেব্রুয়ারি",
  March: "মার্চ",
  April: "এপ্রিল",
  May: "মে",
  June: "জুন",
  July: "জুলাই",
  August: "আগস্ট",
  September: "সেপ্টেম্বর",
  October: "অক্টোবর",
  November: "নভেম্বর",
  December: "ডিসেম্বর",
};

const banglaWeekDays = {
  Sunday: "রবিবার",
  Monday: "সোমবার",
  Tuesday: "মঙ্গলবার",
  Wednesday: "বুধবার",
  Thursday: "বৃহস্পতিবার",
  Friday: "শুক্রবার",
  Saturday: "শনিবার",
};

const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const getGenderWord = (gender) => {
  return gender === "Male" ? "জন্মদিন" : "জন্মদিন";
};

const getDeathWord = (gender) => {
  return gender === "Male" ? "প্রয়াণ দিবস" : "প্রয়াণ দিবস";
};

const getBirthdayMessage = (person, age) => {
  const messages = [
    `আজ ${person.name} এর ${age}তম ${getGenderWord(person.gender)}। রূপসী বাংলা ক্লাবের পক্ষ থেকে জানাই আন্তরিক শুভেচ্ছা ও ভালোবাসা। ঈশ্বর তাঁর মঙ্গল করুন।`,
    `${person.name} এর আজ ${age}তম জন্মদিন। প্রভু যেন তাঁকে সুখ, শান্তি ও দীর্ঘায়ু দান করেন। শুভ জন্মদিন।`,
    `${person.name} এর আজকের এই শুভ দিনটি হোক আনন্দ, ভালোবাসা ও সাফল্যে ভরা। জন্মদিনের আন্তরিক শুভেচ্ছা।`,
    `${person.name} এর প্রতি রূপসী বাংলা ক্লাবের পক্ষ থেকে জন্মদিনের অফুরন্ত শুভেচ্ছা। ঈশ্বর তাঁর জীবনকে সার্থক করুন।`,
    `${person.name} এর জীবনের নতুন অধ্যায় হোক সুখ ও সমৃদ্ধির। জন্মদিনের অনেক অনেক শুভেচ্ছা।`,
    `প্রভু যেন ${person.name} কে দীর্ঘায়ু ও উত্তম স্বাস্থ্য দান করেন। শুভ জন্মদিন।`,
    `${person.name} এর আজকের দিনটি হোক স্মরণীয়। জন্মদিনের হৃদয়গ্রাহী শুভেচ্ছা।`,
    `${person.name} এর জীবন হোক ফুলের মতো সুরভিত ও সুন্দর। জন্মদিনের শুভেচ্ছা।`,
    `${person.name} এর জন্য রইলো রূপসী বাংলা ক্লাবের পক্ষ থেকে জন্মদিনের আন্তরিক শুভেচ্ছা ও দোয়া।`,
    `${person.name} এর আজকের শুভদিনে সবার ভালোবাসা ও আশীর্বাদ বর্ষিত হোক। শুভ জন্মদিন।`
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

const getDeathAnniversaryMessage = (person, deathDate, yearsPassed) => {
  const messages = [
    `আজ ${person.name} এর ${yearsPassed}তম প্রয়াণ দিবস। রূপসী বাংলা ক্লাবের পক্ষ থেকে জানাই গভীর শ্রদ্ধা ও সমবেদনা। ঈশ্বর তাঁর আত্মার শান্তি দান করুন।`,
    `${person.name} এর আজ ${yearsPassed} বছর প্রয়াণ দিবস। আমরা তাঁকে শ্রদ্ধার সাথে স্মরণ করছি।`,
    `${person.name} এর স্মৃতির প্রতি গভীর শ্রদ্ধা। প্রয়াণ দিবসে জানাই বিনম্র শ্রদ্ধাঞ্জলি।`,
    `পরলোকগত ${person.name} এর আত্মার শান্তি কামনা করি। প্রয়াণ দিবসে জানাই সমবেদনা।`,
    `${person.name} চিরকাল আমাদের হৃদয়ে বেঁচে থাকবেন। প্রয়াণ দিবসে জানাই বিনম্র শ্রদ্ধা।`,
    `প্রভু পরলোকগত ${person.name} এর আত্মাকে শান্তি দান করুন। প্রয়াণ দিবসে জানাই গভীর শ্রদ্ধা।`,
    `${person.name} এর আজ প্রয়াণ দিবস। আমরা তাঁর সুকর্ম স্মরণ করছি।`,
    `${person.name} এর বিদেহী আত্মার শান্তি কামনা করি। প্রয়াণ দিবসে রইল বিনম্র শ্রদ্ধা।`
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

const sendNotificationToAll = async (title, message, deepLink = "rbc://birthday") => {
  try {
    const result = await sendPushNotification({
      title: title,
      description: message,
      deepLink: deepLink,
      imageLink: "https://rbcweb.site/_next/image?url=https%3A%2F%2Fi.ibb.co.com%2F7NvsPsDr%2F105629191-19585706509423sss1-631298054909406055-n.jpg&w=1200&q=75"
    });
    
    return result;
  } catch (error) {
    console.error("Error sending notification:", error);
    return { success: false, error: error.message };
  }
};

const getMonthDay = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return `${date.getMonth() + 1}-${date.getDate()}`;
};

const checkBirthdayAndDeathAnniversary = async (req, res) => {
  try {
    const allPeople = await villagePeople.find({}).toArray();
    
    if (!allPeople || allPeople.length === 0) {
      console.log("No people found in villagePeople collection");
      return {
        success: true,
        message: "No people found in database",
        birthdayList: [],
        deathAnniversaryList: []
      };
    }
    
    const today = new Date();
    const todayMonthDay = getMonthDay(today);
    
    const banglaDate = today.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    
    const englishDay = today.toLocaleDateString("en-US", { weekday: "long" });
    const banglaDay = banglaWeekDays[englishDay] || "আজ";
    
    const todayBirthdays = [];
    const todayDeathAnniversaries = [];
    
    for (const person of allPeople) {
      if (person.dateOfBirth && person.isAlive !== false) {
        const birthMonthDay = getMonthDay(person.dateOfBirth);
        if (birthMonthDay === todayMonthDay) {
          const age = calculateAge(person.dateOfBirth);
          todayBirthdays.push({
            ...person,
            age: age
          });
        }
      }
      
      if (person.dateOfDeath && person.dateOfDeath !== "" && person.isAlive === false) {
        const deathMonthDay = getMonthDay(person.dateOfDeath);
        if (deathMonthDay === todayMonthDay) {
          const deathYear = new Date(person.dateOfDeath).getFullYear();
          const yearsPassed = today.getFullYear() - deathYear;
          todayDeathAnniversaries.push({
            ...person,
            yearsPassed: yearsPassed
          });
        }
      }
    }
    const notificationResults = [];
    
    if (todayBirthdays.length > 0) {
      for (const person of todayBirthdays) {
        const message = getBirthdayMessage(person, person.age);
        const title = `শুভ জন্মদিন - ${person.name}`;
        const result = await sendNotificationToAll(title, message, "rbc://birthday");
        
        notificationResults.push({
          type: "birthday",
          person: {
            id: person._id,
            name: person.name,
            age: person.age,
            gender: person.gender
          },
          notificationResult: result
        });
      }
    } else {
      console.log("No birthdays today.");
    }
    
    if (todayDeathAnniversaries.length > 0) {
      
      for (const person of todayDeathAnniversaries) {
        const message = getDeathAnniversaryMessage(person, person.dateOfDeath, person.yearsPassed);
        const title = `প্রয়াণ দিবস - ${person.name}`;
        const result = await sendNotificationToAll(title, message, "rbc://death-anniversary");
        
        notificationResults.push({
          type: "death_anniversary",
          person: {
            id: person._id,
            name: person.name,
            deathDate: person.dateOfDeath,
            yearsPassed: person.yearsPassed,
            gender: person.gender
          },
          notificationResult: result
        });
      }
    } else {
      console.log("No death anniversaries today.");
    }
    const finalResult = {
      success: true,
      date: `${banglaDay}, ${banglaDate}`,
      checkTime: new Date().toISOString(),
      totalPeopleChecked: allPeople.length,
      birthdayCount: todayBirthdays.length,
      deathAnniversaryCount: todayDeathAnniversaries.length,
      birthdays: todayBirthdays.map(p => ({
        name: p.name,
        age: p.age,
        gender: p.gender
      })),
      deathAnniversaries: todayDeathAnniversaries.map(p => ({
        name: p.name,
        deathDate: p.dateOfDeath,
        yearsPassed: p.yearsPassed,
        gender: p.gender
      })),
      notificationResults: notificationResults
    };
    if (res) {
      return res.status(200).json(finalResult);
    }
    
    return finalResult;
    
  } catch (error) {
    console.error("Error in checkBirthdayAndDeathAnniversary:", error);
    
    const errorResult = {
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      timestamp: new Date().toISOString()
    };
    
    if (res) {
      return res.status(500).json(errorResult);
    }
    
    return errorResult;
  }
};


const birthdayDeathAnniversaryHandler = async (req, res) => {
  return await checkBirthdayAndDeathAnniversary(req, res);
};

module.exports = birthdayDeathAnniversaryHandler;
