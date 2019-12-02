import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



def sendNotification(receiver, student_email, student_name, receiver_name, class_name):
    sender_email = "slugstudy2019@gmail.com"
    receiver_email = receiver
    password = "slugsuccess123"

    message = MIMEMultipart("alternative")
    message["Subject"] = "Tutor Request"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message
    text = """\
    Hello {},
    {} has reached out to you for {}.
    Here is their email if you'd like to contact them. 
    {}
    """

    text = text.format(receiver_name,student_name, class_name, student_email)
    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")


    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )