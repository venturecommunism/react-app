defmodule ExtractTextTest do
  use WebAgent.IntegrationCase

  import Wallaby.Query, only: [link: 1, text_field: 1, button: 1]

  @page "http://www.somedrupalsite123456789.com"
  @contactlink link("Contact")
  @emailfield text_field("your-email")
  @subjectfield text_field("your-subject")
  @sendbutton button("Send")
  @email "someone@somewhere.com"
  @subject "This is the Subject"
  @headertest ~r/The title of the blog we hope to match against/i
  @contactheadertest ~r/The title or label on the contact form/i

  test "extract text from some drupal site", %{session: session} do

    session
    |> visit(@page)

    header = get_text(session, "h1.site-title")

    session
    |> click(@contactlink)
    |> fill_in(@emailfield, with: @email)
    |> fill_in(@subjectfield, with: @subject)
    |> click(@sendbutton)
    |> take_screenshot

    contactheader = get_text(session, "h1.entry-title")

    assert header =~ @headertest
    assert contactheader =~ @contactheadertest
  end
end
