const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-6">
      {/* Contact Information Section */}
      <section className="w-full max-w-4xl flex flex-col md:flex-row gap-8 mb-12">
        {/* Map and Address */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Where to Buy</h2>
          <iframe
            className="w-full h-64 rounded-md border-2 border-gray-700"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.3972388867855!2d-79.5544243!3d43.78536959999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2f0dab9bf36f%3A0x490f213d8ecc0d16!2sPlumbing%20Market!5e0!3m2!1sen!2sca!4v1733934009910!5m2!1sen!2sca"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <p className="mt-4 text-gray-400">
            131 Whitmore Rd, Unit 11, Vaughan, ON L4L 6E3. Exclusively at Plumbing Market
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
          <p className="mb-4">
            Have questions or need assistance? We&apos;re here to help!
          </p>
          <div className="flex items-center gap-2 text-lg">
            <span className="text-gray-400">📞</span>
            <a href="tel:+16475638441" className="hover:text-blue-500">
              +1 (289) 236-2378
            </a>
          </div>
        </div>
      </section>


      {/* <section className="w-full max-w-4xl bg-gray-800 p-6 rounded-md shadow-md">
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
      </section> */}
    </main>
  );
};

export default ContactPage;
