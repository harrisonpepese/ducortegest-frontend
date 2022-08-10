export default function InputHandler(curretState, targetValue) {
  const validates = curretState.rules.map((func) =>
    func(targetValue, curretState.minLength)
  );
  const error = validates.find((x) => x.error == true);
  let state;
  if (error) {
    state = {
      ...curretState,
      value: targetValue,
      error: true,
      hint: error.hint,
    };
  } else {
    state = { ...curretState, value: targetValue, error: false, hint: null };
  }
  return state;
}
