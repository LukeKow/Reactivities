using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{

    public class Create
    {
        public class Command : IRequest
        {
            public CreateActivity CreateActivity { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity();
                _mapper.Map(request.CreateActivity, activity);

                _context.Activities.Add(activity);
                await _context.SaveChangesAsync();
            }
        }
    }
}