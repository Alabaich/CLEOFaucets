const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-6">
      {/* Contact Information Section */}
      <section className="w-full max-w-4xl flex flex-col md:flex-row gap-8 mb-12">
        {/* Map and Address */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Our Location</h2>
          <iframe
            className="w-full h-64 rounded-md border-2 border-gray-700"
            src="https://www.google.com/maps?q=131+Whitmore+Rd,+Vaughan,+ON+L4L+6E3&ftid=0x882b2ff478581d2d:0x584b37d095693b71&entry=gps"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <p className="mt-4 text-gray-400">
            131 Whitmore Rd, Vaughan, ON L4L 6E3
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            Have questions or need assistance? We&apos;re here to help!
          </p>
          <div className="flex items-center gap-2 text-lg">
            <span className="text-gray-400">📞</span>
            <a href="tel:+16475638441" className="hover:text-blue-500">
              +1 (647) 563-8441
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full max-w-4xl bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-400 mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your Message"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
