import get from 'lodash.get';

const VARIABLE_REGEX = /{{\s([a-zA-Z0-9_.]*)\s}}/gm;

// Removes any trailing slash from string
export function removeTrailingSlash(value: string) {
  return value.replace(/\/$/, '');
}

export function isExternalLink(href: string) {
  return href.startsWith('http');
}

export function isHashLink(href: string): boolean {
  return href.startsWith('#');
}

// Replaces an object of variables with their moustache values in a string
export function replaceMoustacheVariables(variables: Record<string, string>, value: string) {
  let output = value;
  let m: RegExpExecArray | null;

  while ((m = VARIABLE_REGEX.exec(value)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === VARIABLE_REGEX.lastIndex) {
      VARIABLE_REGEX.lastIndex++;
    }
    output = output.replace(m[0], get(variables, m[1], m[0]));
  }

  return output;
}