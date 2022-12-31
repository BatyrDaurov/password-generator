import _vars from "../_vars";

_vars.rangeValue.innerHTML = _vars.range.value;

_vars.range.oninput = (e) => {
  _vars.rangeValue.innerHTML = e.target.value;
};
