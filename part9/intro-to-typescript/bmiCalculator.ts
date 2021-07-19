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

interface bmiValues {
  value1: number;
  value2: number;
}

const getArguments = (args: Array<string>): bmiValues => {
  if (args.length !== 4) throw new Error('Incorrect number of arguments.');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { value1, value2 } = getArguments(process.argv);

  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message:', e.message);
}
