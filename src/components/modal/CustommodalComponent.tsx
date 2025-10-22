import React, {useState, useRef} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {COLOR} from '../../utils/colors';

type TermsModalProps = {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
};

const CustomModal: React.FC<TermsModalProps> = ({
  visible,
  onAccept,
  onDecline,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    setHasScrolledToBottom(isAtBottom);
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onDecline}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>FAMILY365</Text>
          <Text style={styles.subTitle}>A PROJECT BY</Text>
          <Text style={styles.subTitle}>
            INSPIRATIOS PUBLIC CHARITABLE TRUST
          </Text>

          <Text style={styles.sectionTitle}>TERMS AND CONDITIONS</Text>
          <Text style={styles.warningText}>
            PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. THIS IS A BINDING
            CONTRACT.
          </Text>

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollContainer}
            onScroll={handleScroll}
            scrollEventThrottle={16}>
            <View style={styles.contentContainer}>
              <Text style={styles.paragraph}>
                Welcome to the FAMILY 365 by INSPIRATIONS PUBLIC CHARITABLE
                TRUST (collectively with its affiliates 'FAMILY365' or 'We' or
                'Inspirations Public Charitable Trust'). When using FAMILY365
                service you will be subjected to FAMILY365's Community
                guidelines and additional guidelines or rules posted on the
                FAMILY365 service, made available to you or disclosed to you in
                connection with specific service and features. FAMILY365 may
                also offer certain paid services. All such terms and guidelines
                (the 'Guidelines') are incorporated into these terms of service
                by reference. The Terms of Service apply whether you are a user
                that registers an account with the FAMILY365 Services or an
                unregistered user. You agree that by clicking "Sign Up" or
                otherwise registering, downloading, accessing, or using the
                FAMILY365 Services, you are entering into a legally binding
                agreement between you and Inspirations Public Charitable Trust
                regarding your use of the FAMILY365 Services. You acknowledge
                that you have read, understood, and agree to be bound by these
                Terms of Service. If you do not agree to the Terms of Service,
                do not Access or otherwise use any of the FAMILY365 Services.
              </Text>

              <Text style={styles.sectionHeader}>LICENCES TO USE</Text>
              <Text style={styles.paragraph}>
                Your rights to use the Family365 Service Access to the Family365
                Service Subject to your compliance with these Terms (including
                any other applicable terms and conditions), we grant to you
                limited non-exclusive, revocable permission to make personal,
                non-commercial use of the Family365 Service and the Content
                (collectively "Access"). This access shall remain in effect
                unless and until terminated by you, and Family365. You agree
                that you will not Redistribute or transfer the Family365 Service
                or the Content. The Family365 software application and the
                Content are licensed, not sold or transferred to you, and
                Family365 and its licensors retain ownership of all copies of
                the Family365 software application and Content even after
                installation on your Devices.
              </Text>

              <Text style={styles.sectionHeader}>
                Family365's Proprietary Rights
              </Text>
              <Text style={styles.paragraph}>
                The Family365 Service and the Content are the property of
                Family365 or Family365's licensors. All Family365 trademarks,
                service marks, trade names, logos, domain names, and any other
                features of the Family365 brand ("Family365 Brand Features") are
                the sole property of the Family365 or its licensors. These Terms
                do not grant you any rights to use any Family365 Brand Features
                whether for commercial or non-commercial use. You agree to abide
                by the Family365 User Guidelines and not to use the Family365
                Service, the Content, or any part thereof in any manner not
                expressly permitted by these Terms.
              </Text>

              <Text style={styles.sectionHeader}>
                Legal And Acceptable Use.
              </Text>
              <Text style={styles.paragraph}>
                You must access and use our Service only for legal, authorized
                and acceptable purposes. You will not use (or assist others in
                using) our Service in ways that: (a) violate, misappropriate or
                infringe the rights of Family365, our users, or others,
                including privacy, publicity, intellectual property or other
                proprietary rights; (b) are illegal, obscene, defamatory,
                threatening, intimidating, harassing, hateful, racial, or
                ethically offensive, or instigate or encourage conduct that
                would be illegal or otherwise inappropriate, such as promoting
                violent crimes, endangering and exploiting children or others,
                or coordinating harm; (c) involve publishing falsehood,
                misrepresentations, or misleading statements; (d)impersonate
                someone; (e) involve in illegal or impermissible communications,
                such as bulk messing, auto messaging, auto- dialling, and the
                like; or (f) involve any non-personal use of our Service unless
                otherwise authorized by us.
              </Text>

              <Text style={styles.sectionHeader}>PROHIBITED BEHAVIOURS</Text>
              <Text style={styles.listItem}>
                1. You can't impersonate others or provide inaccurate
                information.
              </Text>
              <Text style={styles.listItem}>
                {' '}
                You don't have to disclose your identity on Family365, but you
                must provide us with accurate and up to date (including
                registration information), which may include providing personal
                data such as name, gender, age, contact information, address and
                geographic map. Also, you may not impersonate someone or
                something you aren't and you can't create an account for someone
                else unless you have their express permission.
              </Text>
              <Text style={styles.listItem}>
                2. You can't do anything unlawful, misleading, or fraudulent or
                for an illegal or unauthorized purpose.
              </Text>
              <Text style={styles.listItem}>
                3. You can't violate (or help or encourage others to violate)
                these Terms or our policies including in particular the
                Family365 Community Guidelines.
              </Text>
              <Text style={styles.listItem}>
                4. You can't do anything to interfere with or impair the
                intended operation of the Service.
              </Text>
              <Text style={styles.listItem}>
                {' '}
                This includes misusing any reporting, dispute such as by making
                fraudulent or groundless reports or appeals.
              </Text>
              <Text style={styles.listItem}>
                5. You can't attempt to create accounts or access or collect
                information in unauthorized ways.
              </Text>
              <Text style={styles.listItem}>
                {' '}
                This includes creating accounts or collecting information in an
                inappropriate way or without our express permission.
              </Text>

              <Text style={styles.sectionHeader}>
                ACCOUNT TERMINATION AND SUSPENSION
              </Text>
              <Text style={styles.paragraph}>
                We may terminate or temporarily suspend your access to the
                Service if you fail to comply with these terms, our Community
                Guidelines or these laws, for any reason outside of our control,
                or for any reason and without advanced notice. That means that
                we may terminate these Terms, stop providing you with all or any
                part of the service, or impose new or additional limits on your
                ability to use our Service. And we'll try to give you reasonable
                notice beforehand, we can't guarantee that notice will be
                possible in all circumstances.
              </Text>

              <Text style={styles.sectionHeader}>
                INTELLECTUAL PROPERTY RIGHTS
              </Text>
              <Text style={styles.paragraph}>
                We respect intellectual property rights and ask you to do the
                same. As a condition of you access to and use of the Services,
                you agree to the terms above and below.
              </Text>

              <Text style={styles.sectionHeader}>
                PAYMENT AND CANCELLATION PRIVACY NOTICE
              </Text>
              <Text style={styles.paragraph}>
                Your privacy is important to Family365. Please see our Privacy
                Notice for information relating to how we collect, use, and
                disclose your personal information, and our Privacy Choices on
                how you can manage your online privacy when you use the
                Family365 Services.
              </Text>

              <Text style={styles.subSectionHeader}>1. Account</Text>
              <Text style={styles.subSectionHeader}>
                a. Account and Password
              </Text>
              <Text style={styles.paragraph}>
                In order to open an account, you will be asked to provide us
                with certain information such as an account name and password.
                You are solely responsible for maintaining the confidentiality
                of your account, your password and for restricting access to
                your devices. If you permit others to use your account
                credentials, you agree to these Terms of Service on behalf of
                all other persons who use the Services under your account or
                password, and you are responsible for all activities that occur
                under your account or password. Please make sure the information
                you provide to Family365 upon registration and at all other
                times is true, accurate, current, and complete to the best of
                your knowledge. Unless expressly permitted in writing by
                Family365, you may not sell, rent, lease, transfer, share, or
                provide access to your account to anyone else, including without
                limitation, charging anyone for access to administrative rights
                on your account. Family365 reserves all available legal rights
                and remedies to prevent unauthorized use of the Family365
                Services, including, but not limited to, technological barriers,
                IP mapping, and in serious cases, directly contacting your
                Internet Service Provider (ISP) regarding such unauthorized use.
              </Text>

              <Text style={styles.subSectionHeader}>
                2. Use of Devices and Services
              </Text>
              <Text style={styles.paragraph}>
                Access to the Family365 Services may require the use of your
                personal computer or mobile device, as well as communications
                with or use of space on such devices. You are responsible for
                any Internet connection or mobile fees and charges from third
                parties that you incur when accessing the Family365 Services.
              </Text>

              <Text style={styles.subSectionHeader}>
                3. Modification of these Terms of Service
              </Text>
              <Text style={styles.paragraph}>
                Family365 may amend any of the terms of these Terms of Service
                by posting the amended terms and updating the "Last modified"
                date above. Your continued use of the Family365 Services after
                the effective date of the revised Terms of Service constitutes
                your acceptance of the terms.
              </Text>

              <Text style={styles.subSectionHeader}>4. License</Text>
              <Text style={styles.paragraph}>
                The Family365 Services are owned and operated by Inspirations
                Public Charitable Trust. Unless otherwise indicated, all
                content, information, and other materials on the Family365
                Services (excluding User Content, set out in Section 8 below),
                including, without limitation, Family356's trademarks and logos,
                the visual interfaces, graphics, design, compilation,
                information, software, computer code (including source code or
                object code), services, text, pictures, information, data, sound
                files, other files, and the selection and arrangement thereof
                (collectively, the "Materials") are protected by relevant
                intellectual property and proprietary rights and laws. All
                Materials are the property of Family365 or its subsidiaries or
                affiliated companies and/or third-party licensors. Unless
                otherwise expressly stated in writing by Family365, by agreeing
                to these Terms of Service you are granted a limited, non-sub
                licensable, and non-transferable license (i.e., a personal and
                limited right) to access and use the family365 Services for your
                personal use only. Family365 reserves all rights not expressly
                granted in these Terms of Service. This license is subject to
                these Terms of Service and does not permit you to engage in any
                of the following: (a) resale or commercial use of the Twitch
                Services or the Materials; (b) distribution, public performance
                or public display of any Materials; (c) modifying or otherwise
                making any derivative uses of the Family365 Services or the
                Materials, or any portion of them; (d) use of any data mining,
                robots, or similar data gathering or extraction methods; (e)
                downloading (except page caching) of any portion of the
                Family365 Services, the Materials, or any information contained
                in them, except as expressly permitted on the Family365
                Services; or (f) any use of the Family365 Services or the
                Materials except for their intended purposes. Any use of the
                Family365 Services or the Materials except as specifically
                authorized in these Terms of Service, without the prior written
                permission of Family365, is strictly prohibited and may violate
                intellectual property rights or other laws. Unless explicitly
                stated in these Terms of Service, nothing in them shall be
                interpreted as conferring any license to intellectual property
                rights, whether by estoppel, implication, or other legal
                principles. Family365 can terminate this license as set out in
                Section 7.
              </Text>

              <Text style={styles.subSectionHeader}>5. Prohibited Conduct</Text>
              <Text style={styles.paragraph}>
                YOU AGREE NOT TO violate any law, contract, intellectual
                property, or other third-party right; not to commit a tort, and
                that you are solely responsible for your conduct while on the
                Family365 Services. You agree that you will comply with these
                Terms of Service and Family365's Community Guidelines and will
                not:
              </Text>
              <Text style={styles.listItem}>
                i. create, upload, transmit, distribute, or store any content
                that is inaccurate, unlawful, infringing, defamatory, obscene,
                pornographic, invasive of privacy or publicity rights,
                harassing, threatening, abusive, inflammatory, or otherwise
                objectionable;
              </Text>
              <Text style={styles.listItem}>
                ii. impersonate any person or entity; falsely claim an
                affiliation with any person or entity; access the Family365
                Services accounts of others without permission; forge another
                person's digital signature; misrepresent the source, identity,
                or content of information transmitted via the Family365
                Services; or perform any other similar fraudulent activity;
              </Text>
              <Text style={styles.listItem}>
                iii. send junk mail or spam to users of the Family365 Services,
                including without limitation unsolicited advertising,
                promotional materials, or other solicitation material; bulk
                mailing of commercial advertising, chain mail, informational
                announcements, charity requests, petitions for signatures, or
                any of the preceding things related to promotional giveaways
                (such as raffles and contests); and other similar activities;
              </Text>
              <Text style={styles.listItem}>
                iv. harvest or collect email addresses or other contact
                information of other users from the Family365;
              </Text>
              <Text style={styles.listItem}>
                v. defame, harass, abuse, threaten, or defraud users of the
                Family365 Services, or collect or attempt to collect, personal
                information about users or third parties without their consent;
              </Text>
              <Text style={styles.listItem}>
                vi. delete, remove, circumvent, disable, damage, or otherwise
                interfere with (a) security-related features of the Family365
                Services or User Content, (b) features that prevent or restrict
                use or copying of any content accessible through the Family365
                Services, (c) features that enforce limitations on the use of
                the Family365 Services or User Content, or (d) the copyright or
                other proprietary rights notices on the Family365 Services or
                User Content;
              </Text>
              <Text style={styles.listItem}>
                vii. reverse engineer, decompile, disassemble, or otherwise
                attempt to discover the source code of the Family365 Services or
                any part thereof, except and only to the extent that this
                activity is expressly permitted by the law of your jurisdiction
                of residence;
              </Text>
              <Text style={styles.listItem}>
                viii. modify, adapt, translate, or create derivative works based
                upon the Family365 Services or any part thereof, except and only
                to the extent that such activity is expressly permitted by
                applicable law notwithstanding this limitation;
              </Text>
              <Text style={styles.listItem}>
                ix. interfere with or damage the operation of the Family365
                Services or any user's enjoyment of them, by any means,
                including uploading or otherwise disseminating viruses, adware,
                spyware, worms, or other malicious code;
              </Text>
              <Text style={styles.listItem}>
                x. relay email from a third party's mail servers without the
                permission of that third party;
              </Text>
              <Text style={styles.listItem}>
                xi. access any website, server, software application, or other
                computer resource owned, used, and/or licensed by Family365,
                including but not limited to the Family365 Services, by means of
                any robot, spider, scraper, crawler, or other automated means
                for any purpose, or bypass any measures Family365 may use to
                prevent or restrict access to any website, server, software
                application, or other computer resource owned, used, and/or
                licensed by Family365, including but not limited to the
                Family365 Services;
              </Text>
              <Text style={styles.listItem}>
                xii. manipulate identifiers in order to disguise the origin of
                any User Content transmitted through the Family365Services;
              </Text>
              <Text style={styles.listItem}>
                xiii. interfere with or disrupt the Family365 Services or
                servers or networks connected to the Family365 Services, or
                disobey any requirements, procedures, policies, or regulations
                of networks connected to the family365 Services; use the
                Family365 Services in any manner that could interfere with,
                disrupt, negatively affect, or inhibit other users from fully
                enjoying the Family365 Services, or that could damage, disable,
                overburden, or impair the functioning of the Family365 Services
                in any manner;
              </Text>
              <Text style={styles.listItem}>
                xiv. use or attempt to use another user's account without
                authorization from that user and Family365;
              </Text>
              <Text style={styles.listItem}>
                xv. attempt to circumvent any content filtering techniques we
                employ, or attempt to access any service or area of the
                family365 Services that you are not authorized to access;
              </Text>
              <Text style={styles.listItem}>
                xvi. attempt to indicate in any manner, without our prior
                written permission, that you have a relationship with us or that
                we have endorsed you or any products or services for any
                purpose; and
              </Text>
              <Text style={styles.listItem}>
                xvii. use the family365 Services for any illegal purpose, or in
                violation of any local, state, national, or international law or
                regulation, including without limitation laws governing
                intellectual property and other proprietary rights, data
                protection, and privacy.
              </Text>
              <Text style={styles.paragraph}>
                To the extent permitted by applicable law, Family365 takes no
                responsibility and assumes no liability for any User Content or
                for any loss or damage resulting therefrom, nor is Family365
                liable for any mistakes, defamation, slander, libel, omissions,
                falsehoods, obscenity, pornography, or profanity you may
                encounter when using the Family365Services. Your use of the
                Family Services is at your own risk. In addition, these rules do
                not create any private right of action on the part of any third
                party or any reasonable expectation that the Family365 Services
                will not contain any content that is prohibited by such rules.
                Family365 is not liable for any statements or representations
                included in User Content. Family365 does not endorse any User
                Content, opinion, recommendation, or advice expressed therein,
                and, to the extent permitted by applicable law, Family365
                expressly disclaims any and all liability in connection with
                User Content. To the fullest extent permitted by applicable law,
                Family365 reserves the right to remove, screen, or edit any User
                Content posted or stored on the Family365 Services at any time
                and without notice, including where such User Content violates
                these Terms of Service or applicable law, and you are solely
                responsible for creating backup copies of and replacing any User
                Content you post or store on the Family365 Services at your sole
                cost and expense. Any use of the Family365 Services in violation
                of the foregoing violates these Terms of Service and may result
                in, among other things, termination or suspension of your rights
                to use the family365 Services.
              </Text>

              <Text style={styles.subSectionHeader}>6. Trademarks</Text>
              <Text style={styles.paragraph}>
                FAMILY365, the Family365 logos, and any other product or service
                name, logo, or slogan used by Family365, and the look and feel
                of the Family365 Services, including all page headers, custom
                graphics, button icons, and scripts, are trademarks or trade
                dress of Family365, and may not be used in whole or in part in
                connection with any product or service that is not Family365's,
                in any manner that is likely to cause confusion among customers,
                or in any manner that disparages or discredits Family365,
                without our prior written permission. Any use of these
                trademarks must be in accordance with the Family365 Trademark
                Guidelines. All other trademarks referenced in the Family365
                Services are the property of their respective owners. Reference
                on the Family Services to any products, services, processes, or
                other information by trade name, trademark, manufacturer,
                supplier, or otherwise does not constitute or imply endorsement,
                sponsorship, or recommendation thereof by us or any other
                affiliation.
              </Text>

              <Text style={styles.subSectionHeader}>7. Idea Submission</Text>
              <Text style={styles.paragraph}>
                By submitting ideas, suggestions, documents, and/or proposals
                (the "Submissions") to Family365 or its employees, you
                acknowledge and agree that Family365 shall be entitled to use or
                disclose such Submissions for any purpose in any way without
                providing compensation or credit to you.
              </Text>

              <Text style={styles.subSectionHeader}>8. Termination</Text>
              <Text style={styles.paragraph}>
                We may terminate your license to use the Family365 Services and
                this Terms of Service agreement at your discretion at any time
                by ceasing to use the Family365 Services or, if you are a
                registered user, by deleting your Family365 account. To the
                fullest extent permitted by applicable law, family365 reserves
                the right, without notice and in our sole discretion, to stop
                providing the Services (or any features) to you or to users
                generally, to terminate this Terms of Service agreement with
                you, to terminate your license to use the Family365 Services,
                and to block or prevent your future access to and use of the
                family365 Services for any reason, including without limitation
                if: (a) your use of the Family365 Services violates these Terms
                of Service or applicable law; (b) you fraudulently use or misuse
                the Family365 Services; or (c) we are unable to continue
                providing the Family365 Services to you due to technical or
                legitimate business reasons. Our right to terminate our
                services, this agreement, and your license includes the ability
                to terminate or to suspend your access to any purchased products
                or services, including any subscriptions. To the fullest extent
                permitted by applicable law, your only remedy with respect to
                any dissatisfaction with: (i) the Family365 Services, (ii) any
                term of these Terms of Service, (iii) any policy or practice of
                Family365 in operating the Family365 Services, or (iv) any
                content or information transmitted through the Family365
                Services, is to terminate your account and to discontinue use of
                any and all parts of the Family365 Services.
              </Text>

              <Text style={styles.subSectionHeader}>9. Disputes</Text>
              <Text style={styles.subSectionHeader}>a. Indemnification</Text>
              <Text style={styles.paragraph}>
                To the fullest extent permitted by applicable law, you agree to
                indemnify, defend, and hold harmless Family365, its affiliated
                companies, and each of our respective contractors, employees,
                officers, directors, agents, third-party suppliers, licensors,
                and partners (individually and collectively, the "Family365
                Parties") from any claims, losses, damages, demands, expenses,
                costs, and liabilities, including legal fees and expenses,
                arising out of or related to your access, use, or misuse of the
                Family365 Services, any User Content you post, or otherwise
                transmit in or through the Family365 Services, your violation of
                the rights of any third party, any violation by you of these
                Terms of Service, or any breach of the representations,
                warranties, and covenants made by you herein. You agree to
                promptly notify the Family365 Parties of any third-party claim,
                and Family365 reserves the right, at your expense, to assume the
                exclusive defense and control of any matter for which you are
                required to indemnify Family365, and you agree to cooperate with
                Family365's defense of these claims. Family365 will use
                reasonable efforts to notify you of any such claim, action, or
                proceeding upon becoming aware of it.
              </Text>

              <Text style={styles.subSectionHeader}>
                b. Limitation of Liability and Damages
              </Text>
              <Text style={styles.subSectionHeader}>
                i. Limitation of Liability
              </Text>
              <Text style={styles.paragraph}>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW: (A) IN NO
                EVENT SHALL TWITCH OR THE FAMILY365 PARTIES BE LIABLE FOR ANY
                DIRECT, SPECIAL, INDIRECT, OR CONSEQUENTIAL DAMAGES, OR ANY
                OTHER DAMAGES OF ANY KIND, INCLUDING BUT NOT LIMITED TO LOSS OF
                USE, LOSS OF PROFITS, OR LOSS OF DATA, WHETHER IN AN ACTION IN
                CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE), OR
                OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE
                OF OR INABILITY TO USE THE FAMILY365 SERVICES, THE CONTENT OR
                THE MATERIALS, INCLUDING WITHOUT LIMITATION ANY DAMAGES CAUSED
                BY OR RESULTING FROM RELIANCE ON ANY INFORMATION OBTAINED FROM
                FAMILY365, OR THAT RESULT FROM MISTAKES, OMISSIONS,
                INTERRUPTIONS, DELETION OF FILES OR EMAIL, ERRORS, DEFECTS,
                VIRUSES, DELAYS IN OPERATION OR TRANSMISSION, OR ANY FAILURE OF
                PERFORMANCE, WHETHER OR NOT RESULTING FROM ACTS OF GOD,
                COMMUNICATIONS FAILURE, THEFT, DESTRUCTION, OR UNAUTHORIZED
                ACCESS TO FAMILY365'S RECORDS, PROGRAMS, OR SERVICES; AND (B) IN
                NO EVENT SHALL THE AGGREGATE LIABILITY OF TWITCH, WHETHER IN
                CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER ACTIVE,
                PASSIVE, OR IMPUTED), PRODUCT LIABILITY, STRICT LIABILITY, OR
                OTHER THEORY, ARISING OUT OF OR RELATING TO THE USE OF OR
                INABILITY TO USE THE FAMILY365 SERVICES EXCEED THE AMOUNT PAID
                BY YOU, IF ANY, FOR ACCESSING THE FAMILY365 SERVICES DURING THE
                TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE DATE OF THE CLAIM.
                TO THE EXTENT THAT APPLICABLE LAW PROHIBITS LIMITATION OF SUCH
                LIABILITY, FAMILY365 SHALL LIMIT ITS LIABILITY TO THE FULL
                EXTENT ALLOWED BY APPLICABLE LAW. To the extent required by
                applicable law, nothing in these Terms shall restrict our
                liability for death or personal injuries caused by Family365;
                for damages caused by Family365's fraud, willful misconduct, or
                gross negligence; and for other losses that may not be excluded
                or limited by applicable law.
              </Text>

              <Text style={styles.subSectionHeader}>
                ii. Basis of the Bargain
              </Text>
              <Text style={styles.paragraph}>
                YOU ACKNOWLEDGE AND AGREE THAT FAMILY365 HAS OFFERED THE
                FAMILY365 SERVICES, USER CONTENT, MATERIALS, AND OTHER CONTENT
                AND INFORMATION, SET ITS PRICES, AND ENTERED INTO THESE TERMS OF
                SERVICE IN RELIANCE UPON THE WARRANTY DISCLAIMERS AND
                LIMITATIONS OF LIABILITY SET FORTH HEREIN, THAT THE WARRANTY
                DISCLAIMERS AND LIMITATIONS OF LIABILITY SET FORTH HEREIN
                REFLECT A REASONABLE AND FAIR ALLOCATION OF RISK BETWEEN YOU AND
                FAMILY365, AND THAT THE WARRANTY DISCLAIMERS AND LIMITATIONS OF
                LIABILITY SET FORTH HEREIN FORM AN ESSENTIAL BASIS OF THE
                BARGAIN BETWEEN YOU AND FAMILY365. FAMILY365 WOULD NOT BE ABLE
                TO PROVIDE THE FAMILY365 SERVICES TO YOU ON AN ECONOMICALLY
                REASONABLE BASIS WITHOUT THESE LIMITATIONS.
              </Text>

              <Text style={styles.subSectionHeader}>
                10. DOCUMENTS REQUIRED FROM THE ORPHANAGES OR OLDAGE HOMES
              </Text>
              <Text style={styles.paragraph}>
                YOU ACKNOWLEDGE AND AGREE TO SUBMIT TO FAMILY365, ALL THE
                DOCUMENTS STATED BELOW TO ENROLL AND BE A PART OF THE FAMILY365
                SERVICES
              </Text>
              <Text style={styles.listItem}>
                • NGO Registration Certificate (under Societies Act / Trust Act
                / Company Act).
              </Text>
              <Text style={styles.listItem}>
                • NGO Maintenance Certificate (under Tamil Nadu Maintenance and
                Welfare of Parents and Senior Citizens Rules, 2009).
              </Text>
              <Text style={styles.listItem}>
                • Up-to-date information of the Old age home in an accessible
                format
              </Text>
              <Text style={styles.listItem}>
                • Contract or Statement of terms between the each Resident and
                the particular Old age home or orphanage.
              </Text>
              <Text style={styles.paragraph}>
                By agreeing to these Terms of Service, you represent that you
                are at least the age of majority, and you have given us your
                consent to allow any of your minor dependents to use this site.
                You may not use our details for any illegal or unauthorized
                purpose nor may you, in the use of the details, you are
                considered to be violated our terms and conditions. A breach or
                violation of any of the Terms will result in an immediate action
                form Inspirations Public Charitable Trust
              </Text>

              <Text style={styles.sectionHeader}>
                SECTION 1 – GENERAL CONDITIONS
              </Text>
              <Text style={styles.listItem}>
                1. We reserve the right to refuse service to anyone for any
                reason at any time.
              </Text>
              <Text style={styles.listItem}>
                2. You understand that your content (not including payment
                information), may be transferred unencrypted and involve (a)
                transmissions over various networks; and (b) changes to conform
                and adapt to technical requirements of connecting networks or
                devices. Payment information is always encrypted during transfer
                over networks.
              </Text>
              <Text style={styles.listItem}>
                3. You agree not to reproduce, duplicate, copy, sell, resell or
                exploit any portion of the Service, use of the Service, or
                access to the Service or any contact on the website through
                which the service is provided, without express written
                permission by us. The headings used in this agreement are
                included for convenience only and will not limit or otherwise
                affect these Terms.
              </Text>
              <Text style={styles.paragraph}>
                We reserve the right at any time to modify or discontinue the
                Service (or any part or content thereof) without notice at any
                time. We shall not be liable to you or to any third-party for
                any modification, price change, suspension or discontinuance of
                the Service.
              </Text>

              <Text style={styles.sectionHeader}>
                SECTION 2 – PERSONAL INFORMATION
              </Text>
              <Text style={styles.paragraph}>
                Your submission of personal information through the application
                is governed by our Privacy Policy.
              </Text>

              <Text style={styles.sectionHeader}>
                SECTION 3 – MISUSE OR MISLEADING
              </Text>
              <Text style={styles.listItem}>
                1. Any kind of misuse of any individuals in the orphanage or in
                the old age home shall be subjected to immediate action.
              </Text>
              <Text style={styles.listItem}>
                2. Any kind of misleading of and individuals in the orphanage or
                in the old age home shall be subjected to immediate action.
              </Text>

              <Text style={styles.sectionHeader}>
                SECTION 4 – MISREPRESENTATION
              </Text>
              <Text style={styles.paragraph}>
                You agree to not indulge in misrepresentation of the name of
                INSPIRATIONS PUBLIC CHARITABLE TRUST, to any individual or
                organisation for once benefit. We reserve the right at any time
                to execute legal proceedings against you without any notice.
              </Text>

              <Text style={styles.sectionHeader}>
                SECTION 5 – AUTHENTICATION OF THE ORPHANAGES AND OLDAGE HOMES
              </Text>
              <Text style={styles.listItem}>
                1. All the required necessary documents from the orphanages or
                old age homes are been cross verified by INSPIRATIONS PUBLIC
                CHARITABLE.
              </Text>

              <Text style={styles.sectionHeader}>
                SECTION 6– ACCESS AND PERMISSION
              </Text>
              <Text style={styles.listItem}>
                1. Each individual enrolled in Family 365 are accessible to the
                Authentication of the orphanages and old age homes
              </Text>
              <Text style={styles.listItem}>
                2. Details of the orphanage or old age homes such as name,
                address, contact number, name of the in - charge person, total
                number of individuals in the orphanages and old age homes, and
                all the personal details such as name, age, gender, year of
                education of the individuals in the orphanages and old age
                homes.
              </Text>

              <Text style={styles.finalWarning}>
                THE ORGANIZATION RESERVES ITS RIGHT TO ADMIT OR REJECT ANY
                APPLICATION.
              </Text>
              <Text style={styles.finalWarning}>
                BY CLICKING "ACCEPT", YOU ACKNOWLEDGE THAT YOU HAVE READ,
                UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.
              </Text>
            </View>
          </ScrollView>

          {/* {!hasScrolledToBottom && (
            <TouchableOpacity
              style={styles.scrollToBottomButton}
              onPress={scrollToBottom}>
              <Text style={styles.scrollToBottomText}>Scroll to Bottom</Text>
            </TouchableOpacity>
          )} */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.decline_btn, styles.declineButton]}
              onPress={onDecline}>
              <Text style={[{color: COLOR.white}, styles.buttonText]}>
                Close
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                styles.button,
                styles.acceptButton,
                !hasScrolledToBottom && styles.disabledButton,
              ]}
              onPress={onAccept}
              disabled={!hasScrolledToBottom}>
              <Text style={[{color: COLOR.white}, styles.buttonText]}>
                ACCEPT
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width - 40,
    maxHeight: Dimensions.get('window').height - 100,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#2c3e50',
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    color: '#7f8c8d',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  warningText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  scrollContainer: {
    width: '100%',
    marginVertical: 10,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#2c3e50',
  },
  subSectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#34495e',
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    color: '#34495e',
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 5,
    color: '#34495e',
    marginLeft: 10,
    lineHeight: 20,
  },
  finalWarning: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  button: {
    borderRadius: 5,
    padding: 12,
    elevation: 2,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decline_btn: {
    borderRadius: 5,
    padding: 12,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: COLOR.black,
  },
  declineButton: {
    backgroundColor: COLOR.black,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollToBottomButton: {
    backgroundColor: COLOR.lavenderPurple,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  scrollToBottomText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomModal;
