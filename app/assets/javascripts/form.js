(function($) {
// validate email
// validate username
// hide/show username field
// handle tweet
// submit form

  function fireEvent(element,event) {
    if (document.createEvent) {
      // dispatch for firefox + others
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true ); // event type,bubbling,cancelable
      return !element.dispatchEvent(evt);
    } else {
      // dispatch for IE
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt)
    }
  }



  /*
   * TODO: Validators should handle error state for the given element
   *       and handle eager validation once error has been triggered
   */
  var EmailValidator = function($el) {
    this.$el = $el;
    this.valid = function() {
      var re = /^.+\@.+\..+/, valid, self = this;
      valid = re.test(this.$el.val());
      if (!valid) {
        this.$el.siblings('.mail_icon').addClass('error').removeClass('valid');
      }
      else {
        this.$el.siblings('.mail_icon').removeClass('error').addClass('valid');
        $('.claim_username_label_temp').addClass('claim_username_label');
      }
      return valid;
    }
  }

  var UsernameValidator = function($el) {
    this.$el = $el;
    this.valid = function() {
      var self = this;
      return $.post('signups/dup',{username: $('#signup_username').val()}, function(data){}, 'JSON')
        .done(function() {
          self.$el.siblings('.signup_username_submit').removeClass('error').addClass('valid');
          self.$el.siblings('.signup_username_label').show();
          self.$el.siblings('.signup_username_error').hide();
          self.is_validated = true;
        })
        .fail(function() {
          self.$el.siblings('.signup_username_submit').addClass('error').removeClass('valid');
          self.$el.siblings('.signup_username_label').hide();
          self.$el.siblings('.signup_username_error').show();
          self.is_validated = false;
        });
    }
    this.is_validated = false;
  }

  var Form = {

    init: function() {
      this.$el = $('form');
      this.bind_events();

      this.email_validator = new EmailValidator(this.$el.find('#signup_email'));
      this.username_validator = new UsernameValidator(this.$el.find('#signup_username'));

      this.render_stage();
    },

    bind_events: function() {
      var self = this;
      self.formSubmitted = false;

      this.$el.on('submit', function(e) {
        e.preventDefault();
        self.handle_submit();
        return false;
      });

      if (twttr) {
        twttr.events.bind('tweet', function(event) {
          var interval = window.setInterval(function() {
            if (!self.formSubmitted) {
              self.submit_form();
              clearInterval(interval);
            }
          }, 200);
        });
      }

      this.$el.find('#signup_email').on('focus', function() {
        self.$el.find('.mail_icon').css('opacity', 1);
      });

      this.$el.find('#signup_email').on('keyup', function() {
        self.email_validator.valid();
      });

      this.$el.find('#signup_username').on('keyup', function() {
        self.username_validator.valid();
      });

      this.$el.find('.claim_username').on('click', function() {
        if (self.stage == 'email_entered') {
          self.$el.find('#signup_username').val('');
          self.stage = 'blank';
          self.render_stage();
        }
      });

      this.$el.find('.signup_username_submit').on('click', function(e) {
        if (!self.username_validator.is_validated) {
          e.stopImmediatePropagation();
          return false;
        }
      });
    },

    handle_submit: function(e) {
      var self = this;
      if (this.stage === 'blank') {
        // validate email
        if (this.email_validator.valid()) {
          if (this.claim_username()) {
            this.enter_email();
          }
          else {
            this.submit_form();
          }
        }
        return;
      }
      else if (this.stage === 'email_entered') {
        return;
      }
    },

    claim_username: function() {
      return this.$el.find('.claim_username').first().is(':checked');
    },


    // form stage should be set in each handler to: %w{ blank email_entered form_submitted }
    stage: 'blank',

    render_stage: function() {
      this.$el.removeClass('blank email_entered form_submitted');
      this.$el.addClass(this.stage);
    },


    // form stage handlers
    enter_email: function() {
      this.stage = 'email_entered';
      this.render_stage();
    },

    enter_username: function() {
      var tweeter = this.$el.find('.send_tweet a')[0];
      fireEvent(tweeter, 'click');
    },

    submit_form: function() {
      var self = this;
      $.ajax({
        url: '/signups',
        type: 'POST',
        data: self.$el.serialize(),
        dataType: 'json'
      }).done(function() {
        self.formSubmitted = true;
        self.stage = 'form_submitted';
        // transition form to show submission confirmation
        self.render_stage();
      });
    }
  }

  $(function() {
    Form.init();
  });

  window.Form = Form;

})(jQuery);
