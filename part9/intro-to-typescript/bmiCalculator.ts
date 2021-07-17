type calculateBmiResult = 'Underweight (Severe thinness)'
                          | 'Underweight (Moderate thinness)'
                          | 'Underweight (Mild thinness)'
                          | 'Normal (Healthy weight)'
                          | 'Overweight (Pre-obese)'
                          | 'Obese (Class I)'
                          | 'Obese (Class II)'
                          | 'Obese (Class III)'

const calculateBmi = (heightInCentimeters: number, weightInKilograms: number): calculateBmiResult => {
  const heightInMeters = heightInCentimeters / 100;
  const bmi = weightInKilograms / (heightInMeters ** 2);

  switch (true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)';
    case bmi < 17:
      return 'Underweight (Moderate thinness)';
    case bmi < 18.5:
      return 'Underweight (Mild thinness)';
    case bmi < 25:
      return 'Normal (Healthy weight)';
    case bmi < 30:
      return 'Overweight (Pre-obese)';
    case bmi < 35:
      return 'Obese (Class I)';
    case bmi < 40:
      return 'Obese (Class II)';
    default:
      return 'Obese (Class III)';
  }
}

console.log(calculateBmi(180, 74)) // => Normal (Healthy weight)
