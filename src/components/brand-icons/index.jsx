import { siGithub } from "simple-icons/icons";

function BrandIcon({ icon, size = 20 }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

export { BrandIcon, siGithub };
