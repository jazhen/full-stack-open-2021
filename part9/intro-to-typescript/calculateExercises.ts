interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hoursExercised: ReadonlyArray<number>, target: number): ExercisesResult => {
  const periodLength = hoursExercised.length;
  const trainingDays = hoursExercised.filter((hours) => hours !== 0).length;
  const total = hoursExercised.reduce((acc, curr) => acc + curr, 0);
  const average = total / hoursExercised.length;
  const success = average > target;
  const [rating, ratingDescription] = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

const getRating = (average: number, target: number): [number, string] => {
  const difference = average - target;

  switch (true) {
    case difference < 0:
      return [1, "did not reach target hours"]
    case difference < 2:
      return [2, "reached target hours"]
    default:
      return [3, "exceeded target hours"]
  }
}

const processArgs = (args: Array<string>): Array<number> => {
  if (args.length <= 2) throw new Error('Incorrect number of arguments.');
  if (args.length === 3) throw new Error('Must provide exercise hours.');

  const values = [];

  for (let i = 2; i < args.length; i++) {
    const argToNumber = Number(args[i]);

    if (isNaN(argToNumber)) {
      throw new Error('Provided values were not numbers!');
    } else {
      values.push(argToNumber);
    }
  }

  return values;
}

try {
  const [target, ...hours] = processArgs(process.argv);

  console.log(calculateExercises(hours, target));
} catch (e) {
  console.log('Error, something bad happened, message:', e.message);
}
