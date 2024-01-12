using Backend.Requests;
using Backend.Requests.Commands;
using FluentValidation;

namespace Backend.Core;

public static class ValidationRules
{
    public class RegisterUserValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .NotNull()
                .EmailAddress().WithMessage("Niepoprawny adres email");

            RuleFor(x => x.Nickname)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3).WithMessage("Nick musi mieć przynajmniej 3 znaki")
                .MaximumLength(20).WithMessage("Nick nie może być dłuższy niż 20 znaków");

            RuleFor(x => x.Password)
                .NotEmpty()
                .NotNull()
                .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$")
                .WithMessage(
                    "Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, znak, i być długie na minimum 8 znaków");

            RuleFor(x => x.ConfirmedPassword)
                .NotEmpty()
                .NotNull()
                .Equal(x => x.Password).WithMessage("Hasła nie są identyczne");
        }
    }

    public class LoginUserValidator : AbstractValidator<LoginUserDto>
    {
        public LoginUserValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .NotNull()
                .EmailAddress().WithMessage("Niepoprawny adres email");

            RuleFor(x => x.Password)
                .NotEmpty()
                .NotNull();
        }
    }

    public class CreateMeetingValidator : AbstractValidator<CreateMeetingDto>
    {
        public CreateMeetingValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3).WithMessage("Tytuł musi mieć przynajmniej 3 znaki")
                .MaximumLength(30).WithMessage("Tytuł nie może być dłuższy niż 30 znaków");

            RuleFor(x => x.End)
                .NotEmpty()
                .NotNull()
                .GreaterThan(x => x.Start).WithMessage("Data zakończenia musi być późniejsza niż data rozpoczęcia");

            RuleFor(x => x.Start)
                .NotEmpty()
                .NotNull()
                .LessThanOrEqualTo(x => x.End).WithMessage("Data rozpoczęcia musi być wcześniejsza niż data zakończenia");
        }
    }

    public class AddNoteValidator : AbstractValidator<AddNoteDto>
    {
        public AddNoteValidator()
        {
            RuleFor(x => x.MeetingId)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.Content)
                .NotEmpty()
                .NotNull()
                .MinimumLength(1)
                .MaximumLength(200);
        }
    }

    public class AddCommentValidator : AbstractValidator<AddCommentDto>
    {
        public AddCommentValidator()
        {
            RuleFor(x => x.MeetingId)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.Content)
                .NotEmpty()
                .NotNull()
                .MinimumLength(1)
                .MaximumLength(200);
        }
    }
}