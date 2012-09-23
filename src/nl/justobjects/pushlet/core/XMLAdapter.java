// Copyright (c) 2000 Just Objects B.V. <just@justobjects.nl>
// Distributable under LGPL license. See terms of license at gnu.org.

package nl.justobjects.pushlet.core;

import nl.justobjects.pushlet.util.Log;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * ClientAdapter that sends Events as XML.
 *
 * @author Just van den Broecke - Just Objects &copy;
 * @version $Id: XMLAdapter.java,v 1.7 2007/11/09 13:15:35 justb Exp $
 */
class XMLAdapter implements ClientAdapter {
	/**
	 * Header for strict XML
	 */
	// public static final String XML_HEAD = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n";
	private String contentType = "text/plain;charset=UTF-8";
	private ServletOutputStream out = null;
	private HttpServletResponse servletRsp;
	private boolean strictXML;

	/**
	 * Initialize.
	 */
	public XMLAdapter(HttpServletResponse aServletResponse) {
		this(aServletResponse, false);
	}

	/**
	 * Initialize.
	 */
	public XMLAdapter(HttpServletResponse aServletResponse, boolean useStrictXML) {
		servletRsp = aServletResponse;

		// Strict XML implies returning a complete XML document
		strictXML = useStrictXML;
		if (strictXML) {
			contentType = "text/xml;charset=UTF-8";
		}
	}

	public void start() throws IOException {

		// If content type is plain text
		// then this is not a complete XML document, but rather
		// a stream of XML documents where each document is
		// an Event. In strict XML mode a complete document is returned.
		servletRsp.setContentType(contentType);

		out = servletRsp.getOutputStream();

		// Don't need this further
		servletRsp = null;

		// Start XML document if strict XML mode
		if (strictXML) {
			out.print("<pushlet>");
		}
	}

	/**
	 * Force client to refresh the request.
	 */
	public void push(Event anEvent) throws IOException {
		debug("event=" + anEvent);

		// Send the event as XML to the client and flush.
		out.print(anEvent.toXML(strictXML));
		out.flush();
	}

	/**
	 * No action.
	 */
	public void stop() throws IOException {
		// Close XML document if strict XML mode
		if (strictXML) {
			out.print("</pushlet>");
			out.flush();
		}
	}

	private void debug(String s) {
		Log.debug("[XMLAdapter]" + s);
	}
}


