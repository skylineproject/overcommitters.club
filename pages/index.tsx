import React from "react";
import moment from "moment";
import {
  format,
  isAfter,
  getMonth,
  setMonth,
  setDate,
  setHours,
  setMinutes
} from "date-fns";

export default () => (
  <main className="h-screen w-full flex flex-col justify-between bg-indigo-100">
    <Header />
    <CTA />
    <Hero />
    <Footer />
  </main>
);

const Header = () => (
  <header className="container mx-auto max-w-4xl">
    <div>
      <h1 className="lg:text-6xl text-3xl uppercase font-bold text-indigo-100 bg-pink-700 px-1 my-1 inline-block">
        Overcommitters Club
      </h1>
    </div>
    <div>
      <h2 className="lg:text-xl text-sm md:text-md lowercase italic font-bold text-pink-700 bg-indigo-100 px-1 inline-block">
        Don't have time for this? You're in the right place.
      </h2>
    </div>
  </header>
);

const Hero = () => (
  <section className="container mx-auto px-12 py-4 max-w-4xl">
    <FAQ question="what is this?">
      <p className="py-2">
        <span className="uppercase font-bold text-sm text-indigo-100 bg-pink-700 px-1 inline-block">
          Overcommitters Club
        </span>{" "}
        is a monthly "event" for folks like us, who sign up for too many things,
        and need to reclaim that time every once in awhile. We like to think
        we're the only recurring event that's happy when you're a no-show.
      </p>
    </FAQ>
    <FAQ question="do you actually meet up?">
      <p className="py-2">
        <span className="uppercase font-bold text-sm text-indigo-100 bg-pink-700 px-1 inline-block">
          Nope!
        </span>{" "}
        Call a meeting of Overcommitters Club wherever you find yourself! If
        you're looking for a community to share your successes, or just
        commisserate with other overcommitters,{' '}
        <a
          className="underline font-bold text-pink-700"
          href="https://join.slack.com/t/skipconf/shared_invite/enQtNjQ4MzIxMjk2ODk5LTIxZGMyN2RmMjUyNTJkZTQxYTM3ZDcyYmJiZjFkNTY4OTFmMGQ1YzY4MDdlZjlhNDY2MGFlN2FmMjBiZTgzNGE"
          target="_blank"
          rel="noopener noreferrer"
        >
          join our Slack
        </a>!
      </p>
    </FAQ>
    <FAQ question="What sorts of things can I do with this time?">
      <p className="py-2">
        <span className="uppercase font-bold text-sm text-indigo-100 bg-pink-700 px-1 inline-block">
          Up to you!
        </span>{" "}
        Use it to do whatever you like. Chill out. Answer those boring emails.
        Better yet, unsubscribe from a bunch of mailing lists. It's your time.
        This is just one way to get that time back.
      </p>
    </FAQ>
  </section>
);

const nextEventDate = () => {
  const thirteenth = moment().date(13).startOf('day');
  return moment().isAfter(thirteenth) ?
    thirteenth.add(1, 'month') :
    thirteenth
};

const nextEventStartTime = nextEventDate().hours(18).minutes(30).seconds(0);

const nextEventEndTime = nextEventDate().hours(20).minutes(30).seconds(0);

const getFormattedEventDate = nextEventStartTime.format("dddd MMMM Do, YYYY @ h:mma");

const formatDateForURL = date => {
  return date.utc().format("YYYYMMDDTHHmmss") + "Z"
};

const googleCalendarURL = () => {
  return `http://www.google.com/calendar/event?action=TEMPLATE&dates=${formatDateForURL(nextEventStartTime)}%2F${formatDateForURL(nextEventEndTime)}&text=Overcommitters%20Club%20meeting&location=&details=This%20is%20your%20friendly%20reminder%20to%20give%20yourself%20back%20a%20few%20hours%20of%20time%20%3A)%0A%0AMore%20info%3A%20https%3A%2F%2Fovercommitters.club&recur=RRULE%3AFREQ%3DMONTHLY%3BINTERVAL%3D1`
};

const CTA = () => (
  <Centerer>
    <div className="py-4 mt-10 mx-8 lg:mx-0 border-2 border-pink-700 rounded-lg max-w-lg">
      <h3 className="text-center lg:text-4xl text-2xl italic font-bold text-pink-700 lowercase">
        Join the club
      </h3>
      <p className="text-center py-2 px-8 text-md">
        <strong>Next event:</strong> {getFormattedEventDate}
      </p>
      <p className="py-2 px-8 text-md text-center">
        Occurs on the 13th of every month. Take two hours back. Takes place wherever you are.
      </p>
      <div className="text-center">
        <Button
          label={"Add to calendar (ics)"}
          href="/static/overcommitters-club.ics"
        />
        <Button
          label={"Add to google calendar"}
          href={googleCalendarURL()}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  </Centerer>
);

const FAQ: React.FC<{
  question: string
}> = ({ question, children }) => (
  <div className="px-4 py-4">
    <h3 className="lg:text-3xl text-lg font-bold bg-indigo-100 text-pink-700 inline-block italic lowercase">
      {question}
    </h3>
    {children}
  </div>
);

const Button: React.FC<{ label: React.ReactNode, href: string, target: string, rel: string }> = ({
  label,
  href,
  target,
  rel
}) => (
  <a
    href={href}
    className="px-4 py-2 m-2 bg-pink-700 text-indigo-100 font-bold text-lg rounded lowercase inline-block"
    target={target}
    rel={rel}
  >
    {label}
  </a>
);

const Centerer: React.FC = ({ children }) => (
  <div className="mx-auto justify-center content-center">{children}</div>
);

const Footer: React.FC = () => (
  <div className="container mx-auto max-w-4xl">
    <p className="lg:text-md text-sm lowercase italic font-bold text-indigo-100 bg-pink-700 px-1 my-1 inline-block">
      brought to you by your friends at{" "}
      <a className="underline" href="http://www.leftblank.co">
        left blank
      </a>
      .
    </p>
  </div>
);
