import React, { useState } from 'react';

const ReviewCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [reportAbuse, setReportAbuse] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const markHelpful = () => setHelpfulCount(helpfulCount + 1);
  const reportAbuseHandler = () => setReportAbuse(true);

  const reviews = [
    {
      name: "Jese Leos",
      joinedDate: "August 2014",
      reviewDate: "March 3, 2017",
      content: "This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.",
      additionalContent: "It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.",
      stars: 4,
    },
    {
      name: "Alex Morgan",
      joinedDate: "January 2020",
      reviewDate: "June 15, 2022",
      content: "Absolutely love this watch! The design is sleek, and it feels sturdy on the wrist. Definitely a great purchase.",
      additionalContent: "However, I did notice that the strap material could have been better. Still, for the price, it's unbeatable!",
      stars: 5,
    },
    {
      name: "Taylor Swift",
      joinedDate: "July 2019",
      reviewDate: "November 10, 2021",
      content: "Good watch, but not as durable as I hoped. It has a few scratches after a month of use.",
      additionalContent: "The customer service was helpful when I reached out about my concerns. Overall, I'd recommend it for occasional use.",
      stars: 3,
    },
  ];

  return (
    <div className="bg-teal-50 p-6" style={{ marginLeft: '1rem' }}>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <article key={index} className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img
                className="w-10 h-10 me-4 rounded-full"
                src={`/docs/images/people/profile-picture-${index + 1}.jpg`}
                alt="Profile"
              />
              <div className="font-medium text-black">
                <p>
                  {review.name}{' '}
                  <time
                    dateTime="2014-08-16 19:00"
                    className="block text-sm text-teal-900"
                  >
                    Joined on {review.joinedDate}
                  </time>
                </p>
              </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < review.stars ? 'text-teal-500' : 'text-black'}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <footer className="mb-5 text-sm text-teal-900">
              <p>
                Reviewed in the United Kingdom on{' '}
                <time dateTime="2017-03-03 19:00">{review.reviewDate}</time>
              </p>
            </footer>
            <p className="mb-2 text-black">{review.content}</p>
            {isExpanded && (
              <p className="mb-3 text-black">{review.additionalContent}</p>
            )}
            <button
              onClick={toggleReadMore}
              className="block mb-5 text-sm font-medium text-teal-700 hover:underline"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
            <aside>
              <p className="mt-1 text-xs text-teal-700">
                {helpfulCount} people found this helpful
              </p>
              <div className="flex items-center mt-3">
                <button
                  onClick={markHelpful}
                  className="px-2 py-1.5 text-xs font-medium text-black focus:outline-none bg-teal-600 rounded-lg border border-black hover:bg-teal-600 focus:z-10 focus:ring-4 focus:ring-teal-200"
                >
                  Helpful
                </button>
                <button
                  onClick={reportAbuseHandler}
                  className="ps-4 text-sm font-medium text-teal-700 hover:underline ms-4 border-black border-s"
                >
                  Report abuse
                </button>
              </div>
              {reportAbuse && (
                <p className="mt-2 text-xs text-black">Thank you for reporting abuse.</p>
              )}
            </aside>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;