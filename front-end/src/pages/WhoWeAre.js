import React from 'react';
import { CheckCircle, Users, GraduationCap, Heart, ArrowRight, Mail, Shield, FileText, Home } from 'lucide-react';
import '../styles/WhoWeAre.css';
import Footer from "../components/Footer"

// Button Component
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>
    {children}
  </div>
);



// Feature Item Component
const FeatureItem = ({ title, description }) => (
  <div className="feature-item">
    <CheckCircle className="feature-icon" />
    <div className="feature-content">
      <h4 className="feature-title">{title}</h4>
      <p className="feature-description">{description}</p>
    </div>
  </div>
);

// Service Card Component
const ServiceCard = ({ emoji, title, description, bgColor = "service-card-blue" }) => (
  <div className={`service-card ${bgColor}`}>
    <div className="service-emoji">{emoji}</div>
    <h3 className="service-title">{title}</h3>
    <p className="service-description">{description}</p>
  </div>
);

// Main WhoWeAre Component
const WhoWeAre = () => {
  const features = [
    {
      title: "Khóa học giáo dục",
      description: "Phù hợp theo từng nhóm tuổi (học sinh, phụ huynh, giáo viên) về tác hại của ma túy, kỹ năng từ chối và sức khỏe tâm thần."
    },
    {
      title: "Đánh giá nguy cơ tương tác",
      description: "Sử dụng các công cụ như ASSIST và CRAFFT giúp bạn hiểu rõ nguy cơ của bản thân và hướng xử lý tiếp theo."
    },
    {
      title: "Hỗ trợ tư vấn trực tuyến",
      description: "Đặt lịch hẹn dễ dàng với chuyên gia tư vấn để nhận lời khuyên, hỗ trợ tâm lý và định hướng."
    },
    {
      title: "Chương trình cộng đồng",
      description: "Quản lý và tham gia các chiến dịch truyền thông, hội thảo giáo dục và hoạt động ngoại khóa."
    },
    {
      title: "Blog & Chia sẻ trải nghiệm",
      description: "Đọc các câu chuyện thực tế, lời khuyên từ chuyên gia và mẹo cho cuộc sống hàng ngày."
    },
    {
      title: "Hồ sơ cá nhân & Theo dõi tiến trình",
      description: "Lưu lại quá trình học tập, lịch hẹn và sự phát triển của bạn."
    }
  ];

  const services = [
    {
      emoji: "🧑‍🎓",
      title: "Học sinh, sinh viên",
      description: "Từ tiểu học đến đại học – những người muốn học cách bảo vệ bản thân và vượt qua áp lực bạn bè.",
      bgColor: "service-card-blue"
    },
    {
      emoji: "👨‍👩‍👧‍👦",
      title: "Phụ huynh & Người giám hộ",
      description: "Những người muốn hiểu hơn về phòng ngừa ma túy và hỗ trợ con em mình.",
      bgColor: "service-card-green"
    },
    {
      emoji: "🧑‍🏫",
      title: "Giáo viên & Tư vấn viên",
      description: "Những người cần công cụ để tích hợp giáo dục phòng chống ma túy vào lớp học.",
      bgColor: "service-card-purple"
    },
    {
      emoji: "🧑‍⚕️",
      title: "Nhân viên y tế & xã hội",
      description: "Những người muốn theo dõi, tư vấn và kết nối với các cá nhân có nguy cơ.",
      bgColor: "service-card-red"
    },
    {
      emoji: "🏘️",
      title: "Tổ chức cộng đồng",
      description: "Thực hiện các hoạt động truyền thông, nâng cao nhận thức và hỗ trợ cộng đồng.",
      bgColor: "service-card-yellow"
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Chúng Tôi Là Ai</h1>
            <p className="hero-subtitle">
              Chúng tôi xây dựng cộng đồng phòng ngừa, từng lựa chọn một.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Introduction Section */}
        <section className="section">
          <Card className="intro-card">
            <CardContent>
              <h2 className="section-title">
                <Heart className="section-icon heart-icon" />
                Vì Sao Phòng Ngừa Ma Túy Quan Trọng
              </h2>
              <div className="prose">
                <p>
                  Mỗi năm, hàng triệu bạn trẻ và gia đình bị ảnh hưởng bởi ma túy, không chỉ bởi nghiện mà còn bởi hậu quả về cảm xúc, xã hội và kinh tế. Dù điều trị rất quan trọng,{" "}
                  <strong>
                    phòng ngừa sớm đã được chứng minh là một trong những cách hiệu quả nhất để giảm nguy cơ sử dụng ma túy
                  </strong>
                  . Phòng ngừa bắt đầu từ nhận thức, giáo dục và hỗ trợ kịp thời.
                </p>
                <p>
                  Tuy nhiên, thực tế là nhiều người không biết bắt đầu từ đâu. Họ có thể cảm thấy quá tải, xấu hổ hoặc không nhận thức được nguy cơ. Giáo viên thiếu tài liệu hướng dẫn. Phụ huynh không biết cách trò chuyện với con. Học sinh thì ngại hỏi.
                </p>
                <p className="highlight-text">Đó là lý do vì sao Drugs Prevention (DP) ra đời.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* About Us Section */}
        <section className="section">
          <Card className="about-card">
            <CardContent>
              <h2 className="section-title">
                <Users className="section-icon users-icon" />
                Chúng Tôi Làm Gì
              </h2>
              <div className="prose about-prose">
                <p>
                  Drugs Prevention là hệ thống hỗ trợ trực tuyến cung cấp giáo dục phòng ngừa, công cụ tương tác và hướng dẫn chuyên môn giúp mọi người, đặc biệt là giới trẻ, hiểu rõ và phòng tránh nguy cơ từ ma túy.
                </p>
                <p>
                  <strong>Chúng tôi không chỉ là một website. Chúng tôi là sáng kiến cộng đồng</strong>—hỗ trợ nhà trường, gia đình và tổ chức cùng chung tay phòng chống ma túy và nâng cao sức khỏe tâm thần.
                </p>
              </div>

              <h3 className="subsection-title">Các tính năng nổi bật:</h3>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <FeatureItem key={index} title={feature.title} description={feature.description} />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Vision Section */}
        <section className="section">
          <Card className="vision-card">
            <CardContent>
              <h2 className="section-title">
                <GraduationCap className="section-icon graduation-icon" />
                Tầm Nhìn: Giá Trị Chúng Tôi Tin Tưởng
              </h2>
              <div className="vision-grid">
                <div className="vision-column">
                  <p className="belief-item">
                    <span className="belief-emoji">🌟</span>
                    Chúng tôi tin rằng mỗi người đều xứng đáng lớn lên trong môi trường an toàn, hiểu biết và được hỗ trợ.
                  </p>
                  <p className="belief-item">
                    <span className="belief-emoji">📚</span>
                    Chúng tôi tin rằng giáo dục là sức mạnh—khi hiểu về nguy cơ ma túy, nhận biết dấu hiệu sớm và biết nơi tìm kiếm hỗ trợ, mọi người sẽ đưa ra lựa chọn tốt hơn.
                  </p>
                </div>
                <div className="vision-column">
                  <p className="belief-item">
                    <span className="belief-emoji">💻</span>
                    Chúng tôi tin rằng công nghệ có thể thu hẹp khoảng cách—giúp tài nguyên phòng ngừa đến với bất kỳ ai, ở bất cứ đâu, bất cứ lúc nào.
                  </p>
                  <p className="belief-item">
                    <span className="belief-emoji">🤝</span>
                    Chúng tôi tin rằng cộng đồng là chìa khóa—sự thay đổi không chỉ đến từ cá nhân mà từ sự chung tay của gia đình, nhà trường và tổ chức.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Who We Serve Section */}
        <section className="section">
          <Card className="serve-card">
            <CardContent>
              <h2 className="section-title centered">Chúng Tôi Phục Vụ Ai</h2>
              <div className="services-grid">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    emoji={service.emoji}
                    title={service.title}
                    description={service.description}
                    bgColor={service.bgColor}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Why This Matters Now */}
        <section className="section">
          <Card className="matters-card">
            <CardContent>
              <h2 className="section-title">Vì Sao Điều Này Quan Trọng Hiện Nay</h2>
              <div className="prose">
                <p>
                  Ngày nay, nguy cơ từ ma túy không còn dễ nhận biết. Chất gây nghiện dễ tiếp cận hơn, ảnh hưởng bạn bè qua mạng xã hội mạnh mẽ hơn, và nhiều bạn trẻ gặp khó khăn tâm lý làm tăng nguy cơ. <strong>Phòng ngừa không còn là lựa chọn—mà là điều bắt buộc.</strong>
                </p>
                <p>
                  Với công cụ phù hợp, chúng ta có thể giúp mọi người đưa ra quyết định an toàn, đúng đắn và tự tin. Dù là nói không ở bữa tiệc, trò chuyện với bạn gặp khó khăn, hay tìm đến chuyên gia—<strong className="prevention-highlight">phòng ngừa cứu sống mạng người.</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="section">
          <Card className="cta-card">
            <CardContent className="cta-content">
              <h2 className="cta-title">Tham Gia Cùng Chúng Tôi</h2>
              <p className="cta-subtitle">
                Dù bạn đến để học, để dạy, để giúp người khác hay tìm kiếm sự giúp đỡ cho chính mình—bạn không đơn độc.
              </p>
              <p className="cta-description">
                Hãy cùng xây dựng một cộng đồng mạnh khỏe, hiểu biết và chủ động—bởi vì trong phòng ngừa ma túy, <strong>mỗi bước đi đều quan trọng.</strong>
              </p>
              <div className="cta-buttons">
                <Button size="lg" className="cta-primary">
                  <a href="/login" className="cta-link">
                    Bắt đầu ngay hôm nay
                    <ArrowRight className="icon-sm" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="cta-secondary">
                  Tìm hiểu thêm về các chương trình
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

     <Footer />
    </div>
  );
};

export default WhoWeAre;