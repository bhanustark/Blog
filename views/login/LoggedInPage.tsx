const { APP_ROOT } = Bun.env
const LoggedInPage = () => {
    return (
        <div class="min-h-screen bg-base-200 flex items-center">
            <meta http-equiv="refresh" content={`0; url=${APP_ROOT}/dash`} />
            <div class="card mx-auto w-full max-w-5xl  shadow-xl">
                <div class="grid grid-cols-1  bg-base-100 rounded-xl">
                    <div class=''>
                        <div class="hero min-h-full rounded-l-xl bg-base-200">
                            <div class="hero-content py-12">
                                <div class="max-w-md">
                                    <h1 class='text-3xl font-bold '>Logged in!</h1>
                                    <h2 class="text-2xl mt-8 font-bold">Redirecting to dashboard</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoggedInPage;