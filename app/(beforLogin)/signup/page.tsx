"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PageTitle from "@/components/common/PageTitle";
import ViewBreakPoint from "@/components/common/ViewBreakPoint";
import { useSignup } from "@/hooks/muataions/useSignupMutation";
import { useBreakPoint } from "@/hooks/useBreakPoint";
import { SignupType } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();

  // 회원가입 정보
  const [signupValue, setSignupValue] = useState<SignupType>({
    email: "",
    name: "",
    phone: "",
    password: "",
  });

  // 회원가입 뮤테이션
  const signupMutation = useSignup();

  // break point 커스텀훅
  const smBreakPoint = useBreakPoint("sm");

  // 비밀번호 검증
  const password = signupValue.password;
  const isPasswordValid =
    password.length >= 8 &&
    password.length <= 16 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password);
  const passwordError = password.length > 0 && !isPasswordValid;

  // 회원가입 함수
  const handleSignupSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signupValue.email) {
      alert("이메일을 입력해주세요");
      return;
    }

    if (!signupValue.name) {
      alert("이름을 입력해주세요");
      return;
    }

    if (!signupValue.phone) {
      alert("전화번호를 입력해주세요");
      return;
    }

    if (!isPasswordValid) {
      alert("비밀번호 조건을 확인해주세요");
      return;
    }

    if (confirm("회원가입을 진행하시겠습니까?")) {
      signupMutation.mutate(signupValue, {
        onSuccess: () => {
          alert("회원가입이 완료되었습니다");
          router.replace("/");
        },
        onError: (error) => {
          console.error("회원가입 실패", error);
          alert("회원가입에 실패했습니다");
        },
      });
    }
  };

  return (
    <section>
      <PageTitle className="text-center">회원가입</PageTitle>
      <form
        className="w-full flex justify-center"
        onSubmit={handleSignupSubmit}
      >
        <div className="w-full max-w-100 flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="text-[0.8rem] sm:text-[0.9rem] font-semibold text-label-alternative"
            >
              이메일
            </label>
            <Input
              id="email"
              placeholder="이메일을 입력해주세요"
              type="email"
              value={signupValue.email}
              required
              className="text-[0.8rem] sm:text-[0.9rem] text-label-alternative mt-1"
              onChange={(e) =>
                setSignupValue((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="text-[0.8rem] sm:text-[0.9rem] font-semibold text-label-alternative"
            >
              이름
            </label>
            <Input
              id="name"
              placeholder="이름을 입력해주세요"
              value={signupValue.name}
              required
              className="text-[0.8rem] sm:text-[0.9rem] text-label-alternative mt-1"
              onChange={(e) =>
                setSignupValue((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-[0.8rem] sm:text-[0.9rem] font-semibold text-label-alternative"
            >
              휴대폰 번호
            </label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="예시) 01012345678"
              value={signupValue.phone}
              required
              className="text-[0.8rem] sm:text-[0.9rem] text-label-alternative mt-1"
              onChange={(e) => {
                const phone = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 11);

                setSignupValue((prev) => ({
                  ...prev,
                  phone: phone,
                }));
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-[0.8rem] sm:text-[0.9rem] font-semibold text-label-alternative"
            >
              비밀번호
            </label>
            <Input
              id="password"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              value={password}
              required
              minLength={8}
              maxLength={16}
              className={`text-[0.8rem] sm:text-[0.9rem] text-label-alternative my-1 ${passwordError && "border border-status-negative"}`}
              onChange={(e) =>
                setSignupValue((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <p
              className={`${passwordError && "text-status-negative"} text-[0.7rem] font-semibold text-label-assistive`}
            >
              영문, 숫자, 특수문자를 포함하여 8자 이상 16자 이하로 입력해주세요.
            </p>
          </div>
          <div className="flex gap-3 justify-end mt-10">
            <Button
              type="button"
              variant="outline"
              size={smBreakPoint ? "sm" : "lg"}
              onClick={() => router.replace("/")}
            >
              홈으로 가기
            </Button>
            <Button
              type="submit"
              size={smBreakPoint ? "sm" : "lg"}
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "가입중..." : "회원가입"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignupPage;
