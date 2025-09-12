"use client";

export default function SameDay({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 595.28 841.89"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id="grad"
          x1="0"
          y1="0"
          x2="595.28"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          {/* Green */}
          <stop offset="5%" stopColor="#27ef46">
            <animate
              attributeName="offset"
              values="0.05;0.15;0.1;0.18;0.05"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>

          {/* Cyan */}
          <stop offset="30%" stopColor="#3cc2dd">
            <animate
              attributeName="offset"
              values="0.25;0.35;0.3;0.38;0.32"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>

          {/* Light Green */}
          <stop offset="60%" stopColor="#93f179">
            <animate
              attributeName="offset"
              values="0.55;0.65;0.6;0.68;0.58"
              dur="7s"
              repeatCount="indefinite"
            />
          </stop>

          {/* Blue */}
          <stop offset="90%" stopColor="#1e3cff">
            <animate
              attributeName="offset"
              values="0.8;0.9;0.85;0.88;0.82"
              dur="8s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      <g fill="url(#grad)">
        <path d="M18.22,282.48l12.99-12.74c3.36,4.97,9.63,7.98,16.41,7.98,4.57,0,9.03-1.66,9.03-4.97,0-4.16-8.28-7.83-16.21-11.34-10.23-4.42-19.01-11.14-19.01-23.33,0-14,13.3-23.98,28.65-23.98,12.34,0,21.98,5.82,25.14,13.8l-12.39,11.94c-2.41-4.26-8.63-6.12-12.49-6.12-4.42,0-7.58,2.26-7.58,5.02,0,3.71,5.72,4.92,14.45,8.58,12.64,5.32,21.02,13.04,21.02,24.98,0,15.4-14.35,24.98-30.55,24.98-13.3,0-25.39-5.87-29.45-14.8Z" />
        <path d="M135.88,286.74h-30.2l-4.11,9.43h-23.48l37.58-81.88h10.18l37.63,81.88h-23.53l-4.06-9.43ZM129.05,271.04l-8.28-19.17-8.33,19.17h16.61Z" />
        <path d="M258.25,214.54v81.63h-21.47v-32.06l-21.77,30.7h-.15l-21.82-30.7v32.06h-21.47v-81.63h8.63l34.72,47.56,34.72-47.56h8.63Z" />
        <path d="M293.52,235.27v11.29h25.69v17.91h-25.69v11.59h31.21v20.12h-52.43v-80.88h52.43v19.97h-31.21Z" />
        <path d="M438.72,255.84c0,25.09-16.81,40.34-44.3,40.34h-26.39v-80.83l26.39-.05c27.49-.1,44.3,15.25,44.3,40.54ZM417.2,255.79c0-12.69-8.83-20.42-23.33-20.42h-4.92v40.59h5.12c14.35,0,23.13-7.63,23.13-20.17Z" />
        <path d="M493.67,286.74h-30.2l-4.11,9.43h-23.48l37.58-81.88h10.18l37.63,81.88h-23.53l-4.06-9.43ZM486.84,271.04l-8.28-19.17-8.33,19.17h16.61Z" />
        <path d="M530.75,261.25l-24.93-45.96h24.33l11.29,23.43,11.24-23.43h24.38l-24.98,45.96v34.92h-21.32v-34.92Z" />
      </g>
    </svg>
  );
}
